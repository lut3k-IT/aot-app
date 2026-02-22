from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    print("Navigating to quotations page...")
    try:
        page.goto("http://localhost:3000/quotations")

        # Wait for some content to load.
        # Looking at the code, it renders QuotationCard.
        # I'll wait for a card or the no results message.
        # QuotationCard has text.

        # Let's wait for network idle to be safe, or a specific element.
        page.wait_for_load_state("networkidle")

        print("Page loaded. Taking screenshot...")
        page.screenshot(path="quotations_page.png")
        print("Screenshot saved to quotations_page.png")

    except Exception as e:
        print(f"Error: {e}")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
