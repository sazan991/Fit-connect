from playwright.sync_api import sync_playwright


class YoutubeScraper:

	def __init__(self):
		self.base_url = "https://www.youtube.com/results?search_query="

	def scrape(self, keyword):
	    with sync_playwright() as p:
	    	browser = p.chromium.launch() #headless=False)
	    	page = browser.new_page()
	    	page.goto(self.base_url + keyword)

	    	# Wait
	    	page.wait_for_selector("ytd-video-renderer")
	    	all_videos = page.query_selector_all("ytd-video-renderer")
	    	videos = []

	    	for video in all_videos:
	    		video_tag = video.query_selector("h3 a")
	    		video_title = video_tag.inner_text()
	    		href = video_tag.get_attribute("href")
	    		video_url = "https://www.youtube.com" + href

	    		videos.append({
	    				'title': video_title,
	    				'url': video_url
	    			})

	    	browser.close()

	    	return videos


# yt = YoutubeScraper()
# videos = yt.scrape("biceps+workout+video")
# for video in videos:
#     print(f"Title: {video['title']}, URL: {video['url']}")
