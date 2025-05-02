from apify_client import ApifyClient
import agents as oai_agents
from typing import List, Dict

apify_client = ApifyClient('apify_api_eRStzIFOmiKa9tbRqgUK9wiDdmShJE0myIkc')

@oai_agents.function_tool
def get_tiktok_videos(hashtags: List[str]) -> List[Dict[str, str]]:
    tiktok_input = {
    "hashtags": hashtags,
    "proxyCountryCode": "None",
    "resultsPerPage": 5,
    "shouldDownloadCovers": False,
    "shouldDownloadSlideshowImages": False,
    "shouldDownloadSubtitles": False,
    "shouldDownloadVideos": False
    }
    actor_run = apify_client.actor('clockworks/tiktok-scraper').call(
    run_input=tiktok_input
    )
    dataset_items = apify_client.dataset(actor_run['defaultDatasetId']).list_items().items
    result = []
    for item in dataset_items:
        result.append({"videoUrl": item["webVideoUrl"]})
    return result