import { useQuery } from "@tanstack/react-query";
import { RefreshIcon } from "../assets/refresh-icon";
import { QuoteService } from "../shared/services/quote-service";

export function QuoteGenerator() {
  const {
    data: quote,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["quote"],
    queryFn: handleQuote,
    refetchOnWindowFocus: false,
  });

  async function handleQuote() {
    try {
      const quote = new QuoteService().getQuote();
      return quote;
    } catch (error) {
      throw new Error("Failed to fetch quote");
    }
  }

  if (isLoading) return null;

  return (
    <div className="w-full flex items-start justify-between gap-4 p-8">
      <section className="flex flex-col gap-2">
        <p className="text-xs text-white leading-[22px]">“{quote?.content}”</p>

        <span className="text-xs text-white font-bold leading-[22px]">
          {quote?.author}
        </span>
      </section>

      <button
        className="flex items-center justify-center p-2 pointer"
        type="button"
        onClick={() => refetch()}
        disabled={isFetching}
      >
        <RefreshIcon />
      </button>
    </div>
  );
}
