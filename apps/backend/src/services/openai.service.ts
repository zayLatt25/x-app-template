import { HttpException } from '@/exceptions/HttpException';
import { openAIHelper } from '@/server';
import { isBase64Image } from '@/utils/data';
import { Service } from 'typedi';

@Service()
export class OpenaiService {
  public async validateImage(image: string, promptType: string): Promise<unknown> {
    if (!isBase64Image(image)) throw new HttpException(400, 'Invalid image format');

    let prompt = '';
    switch (promptType) {
      case 'Transport':
        prompt = `
            Analyze the image provided. The image MUST satisfy all of the following criteria:
                1. It must be a screenshot or picture of public transport including bikes, and buses, or steps of a user walking
                2. It must include the distance travelled in any form (e.g. steps, km, miles)
            Please respond always and uniquely with the following JSON object as you are REST API that returns the following object:
            {
            "validityFactor": {validityFactorNumber}, // 0-1, 1 if it satisfies all the criteria, 0 otherwise
            "distanceTravelled": "{distance}", // distance travelled in km, even if the image shows other units, convert it to km
            "vehicleType": "{vehicleType}", // indicate the type of vehicle in the image. If the user walked, indicate "walk". If the user used a bike, indicate "bike". If the user used a bus, indicate "bus". If the user used a train, indicate "train".
            "descriptionOfAnalysis": "{analysis}", // indicate your analysis of the image and why it satisfies or not the criteria. The analysis will be shown to the user so make him understand why the image doesn't satisfy the criteria if it doesn't without going into detail on exact criteria. Remember we are rewarding users that drink coffee in a sustainable way.
            }
            `;
        break;

      case 'Electricity':
        prompt = `
            Analyze the image provided. The image MUST satisfy all of the following criteria:
                1. It must be a form of invoice or bill related to electricity usage
                2. It must include the kWh or kilowatt-hour that measures the electricity used 
            Please respond always and uniquely with the following JSON object as you are REST API that returns the following object:
            {
            "validityFactor": {validityFactorNumber}, // 0-1, 1 if it satisfies all the criteria, 0 otherwise
            “kWh”: {electricityUsed}, // the final kilowatt-hour of the month as shown in the image
            "descriptionOfAnalysis": "{analysis}", // indicate your analysis of the image and why it satisfies or not the criteria. The analysis will be shown to the user so make him understand why the image doesn't satisfy the criteria if it doesn't without going into detail on exact criteria. Remember we are rewarding users that drink coffee in a sustainable way.
            }
            `;
        break;

      case 'Recyclable_Packaging':
        break;

      case 'Tree_Planting':
        break;

      case 'Waste_Removal':
        break;

      case 'Volunteering':
        break;

      default:
        throw new HttpException(400, 'Invalid prompt type');
    }

    console.log(prompt);
    const gptResponse = await openAIHelper.askChatGPTAboutImage({
      base64Image: image,
      prompt,
    });

    const responseJSONStr = openAIHelper.getResponseJSONString(gptResponse);

    return openAIHelper.parseChatGPTJSONString(responseJSONStr);
  }
}
