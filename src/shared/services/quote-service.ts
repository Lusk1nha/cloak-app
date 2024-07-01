import { QuoteRepo } from "../repositories/quote-repo";

export class QuoteService {
  async getQuote() {
    const quote = await new QuoteRepo().getRandomQuote();
    return quote;
  }
}
