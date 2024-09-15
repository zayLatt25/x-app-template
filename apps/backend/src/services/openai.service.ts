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
            Please respond with the following JSON object, as you are a REST API returning this format: 
            {
            "validityFactor": {validityFactorNumber}, // 0-1, 1 if it satisfies all the criteria, 0 otherwise
            "distanceTravelled": "{number}", // distance travelled in km, even if the image shows other units, convert it to km, just the number itself
            "vehicleType": "{vehicleType}", // indicate the type of vehicle in the image. If the user walked, indicate "walk". If the user used a bike, indicate "bike". If the user used a bus, indicate "bus". If the user used a train, indicate "train".
            "descriptionOfAnalysis": "{analysis}", // indicate your analysis of the image and why it satisfies or not the criteria. The analysis will be shown to the user so make him understand why the image doesn't satisfy the criteria if it doesn't without going into detail on exact criteria.
            }
            `;
        break;

      case 'Electricity':
        prompt = `
            Analyze the image provided. The image MUST satisfy all of the following criteria:
                1. It must be a form of invoice or bill related to electricity usage
                2. It must include the kWh or kilowatt-hour that measures the electricity used 
            Please respond with the following JSON object, as you are a REST API returning this format: 
            {
            "validityFactor": {validityFactorNumber}, // 0-1, 1 if it satisfies all the criteria, 0 otherwise
            “kWh”: {number}, // the final kilowatt-hour of the month as shown in the image, just the number itself
            "descriptionOfAnalysis": "{analysis}", // indicate your analysis of the image and why it satisfies or not the criteria. The analysis will be shown to the user so make him understand why the image doesn't satisfy the criteria if it doesn't without going into detail on exact criteria.
            `;
        break;

      case 'Recyclable_Packaging':
        prompt = `
            Analyze the image provided. Look out for visual cues as such, that suggest if the object is made with recycled material:
                1. Texture: Irregular or rough textures, uneven surfaces, or visible recycled components (e.g., paper fibers, plastic regrind).
                2. Labels/Markings: Check for eco-friendly symbols, recycling codes (e.g., triangular recycling symbol with a number), or labels like 'Made from Recycled Materials.'
                3. Material Properties: Infer material types (e.g., recycled paper, plastic, metal) from visual patterns, coloration, or common recycled item forms.
                4. Context: Consider the surrounding environment or context where the object appears, such as a recycling facility, eco-friendly packaging, or other sustainability-related hints.
                5. Coloration: Inconsistent colors or hues that suggest a mixture of recycled material.
                6. Shape: Unusual or irregular shapes that may indicate recycled material or a unique manufacturing process.
                7. Other: Any other visual cues that suggest the object is made with recycled material.
            Please respond with the following JSON object, as you are a REST API returning this format: 
            {
            "validityFactor": {confidenceScore}, // 0-1, 1 if its most likely to be a recycled material based on visual cues, 0 otherwise
            "carbonFootprint": "{carbonFootprint}", // potential carbon footprint number of the object in kilograms if it is made from recycled material
            "descriptionOfAnalysis": "{analysis}", // indicate your analysis of the image and why it is or not using recycled material. The analysis will be shown to the user so make him understand why the object may or may not be made from recycled material without going into much detail.
            `;
        break;

      case 'Tree_Planting':
        prompt = `
            Analyze the provided image of a planted tree according to the following criteria: 
                1. It must show a clear image of a planted tree (not a potted plant or other vegetation). 
                2. The tree should be planted directly in soil or ground, not in a container. 
                3. The image should be in focus and well-lit, clearly showing the tree's trunk and surrounding soil. 
                4. There must be no visible signs that the image is digitally altered or manipulated. 
                5. Based on the tree's appearance and characteristics (such as size, type, and maturity if discernible), estimate the potential carbon sequestration over a typical tree's lifetime (e.g., 20 years). Use an average sequestration value of **~22 kg of CO2 per year per tree** if precise data is unavailable. 
            Please respond with the following JSON object, as you are a REST API returning this format: 
            { 
            "validityFactor": {validityFactorNumber}, // 0-1, where 1 indicates the image fully satisfies all criteria, and 0 if it doesn't. 
            "carbonSequestrationEstimate": {carbonCreditInKg}, // Estimate the potential carbon sequestration in kilograms over a typical tree lifetime (e.g., 20 years), based on tree characteristics or an average if details are unclear. }
            "descriptionOfAnalysis": "{analysis}", // Describe whether the image satisfies the criteria or not, and why. 
            `;
        break;

      case 'Waste_Removal':
        return {
          validityFactor: 0,
          descriptionOfAnalysis: 'Waste Removal Coming Soon...',
        };

      case 'Volunteering':
        return {
          validityFactor: 0,
          descriptionOfAnalysis: 'Volunteering Coming Soon...',
        };

      default:
        throw new HttpException(400, 'Invalid prompt type');
    }

    const gptResponse = await openAIHelper.askChatGPTAboutImage({
      base64Image: image,
      prompt,
    });

    const responseJSONStr = openAIHelper.getResponseJSONString(gptResponse);

    return openAIHelper.parseChatGPTJSONString(responseJSONStr);
  }
}
