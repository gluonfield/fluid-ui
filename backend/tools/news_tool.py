from apify_client import ApifyClient
import agents as oai_agents
from typing import List, Dict

apify_client = ApifyClient('apify_api_eRStzIFOmiKa9tbRqgUK9wiDdmShJE0myIkc')


@oai_agents.function_tool
def get_latest_news(keyword: str) -> List[Dict]:
    news_input = {
        "fetchArticleDetails": True,
        "language": "US:en",
        "maxItems": 5,
        "proxyConfiguration": {
            "useApifyProxy": True
        },
        "query": keyword
    }
    actor_run = apify_client.actor('lhotanova/google-news-scraper').call(
    run_input=news_input
    )
    items = apify_client.dataset(actor_run['defaultDatasetId']).list_items().items
    return items