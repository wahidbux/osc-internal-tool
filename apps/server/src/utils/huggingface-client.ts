import { InferenceClient } from "@huggingface/inference";

const hfClient = new InferenceClient(process.env.HF_TOKEN);
console.log(process.env.HF_TOKEN);

export default hfClient;
