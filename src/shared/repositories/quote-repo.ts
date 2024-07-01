export interface QuoteResponse {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export class QuoteRepo {
  private _endpoint = "https://api.quotable.io";

  async getRandomQuote(): Promise<QuoteResponse> {
    const response = await fetch(this._endpoint + "/random");
    const data = await response.json();

    return data;
  }
}
