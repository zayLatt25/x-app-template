import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { OpenaiService } from '@/services/openai.service';
import { Submission } from '@/interfaces/submission.interface';
import { ContractsService } from '@/services/contracts.service';
import { HttpException } from '@/exceptions/HttpException';

export class SubmissionController {
  public openai = Container.get(OpenaiService);
  public contracts = Container.get(ContractsService);

  public submitReceipt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: Omit<Submission, 'timestamp' | 'promptType'> = req.body;

      const submissionRequest: Submission = {
        ...body,
        timestamp: Date.now(),
      };

      await this.contracts.validateSubmission(submissionRequest);

      const validationResult = await this.openai.validateImage(body.image, req.body.promptType);

      if (validationResult == undefined || !('validityFactor' in (validationResult as object))) {
        throw new HttpException(500, 'Error validating image');
      }

      const validityFactor = validationResult['validityFactor'];

      if (validityFactor > 0.5) {
        if (!(await this.contracts.registerSubmission(submissionRequest))) {
          throw new HttpException(500, 'Error registering submission and sending rewards');
        }
      }

      res.status(200).json({ validation: validationResult });
    } catch (error) {
      next(error);
      return;
    }
  };
}
