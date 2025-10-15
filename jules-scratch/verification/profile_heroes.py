
import time
from playwright.sync_api import sync_playwright, Page, expect

def profile_heroes_performance(page: Page):
    """
    Profiles the performance of the Heroes gallery page,
    measuring initial load and filtering speed.
    """
    # 1. Measure Initial Page Load
    start_time = time.time()
    page.goto("http://localhost:5173/heroes/gallery")

    # Wait for the first hero card to be visible, indicating the page has loaded.
    expect(page.locator('.flex.gap-4.h-27').first).to_be_visible(timeout=30000) # 30s timeout

    end_time = time.time()
    initial_load_time = end_time - start_time
    print(f"Initial page load time: {initial_load_time:.2f} seconds")

    # Take a screenshot after the initial load.
    page.screenshot(path="jules-scratch/verification/initial_load.png")

    # 2. Measure Filtering Performance
    # Open the filter panel
    filter_button = page.get_by_role("button", name="Filter")
    filter_button.click()

    # Wait for the filter dialog to be visible
    expect(page.get_by_role("heading", name="Filter Heroes")).to_be_visible()

    # Click the "Save changes" button to apply the filters
    apply_filters_button = page.get_by_role("button", name="Save changes")

    start_time = time.time()
    apply_filters_button.click()

    # Wait for the filter dialog to close
    expect(page.get_by_role("heading", name="Filter Heroes")).not_to_be_visible()

    end_time = time.time()
    filtering_time = end_time - start_time
    print(f"Filtering time: {filtering_time:.2f} seconds")

    # Take a screenshot of the filtered results.
    page.screenshot(path="jules-scratch/verification/filtered_load.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            profile_heroes_performance(page)
        finally:
            browser.close()

if __name__ == "__main__":
    main()
