
from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        print("Navigating to heroes page...")
        page.goto("http://localhost:5173/heroes")
        page.wait_for_load_state("networkidle")
        time.sleep(5) # a little extra padding
        print("Waiting for filter button...")
        page.wait_for_selector('[aria-label="Filter"]', timeout=60000)

        # Open filter dialog
        page.click('[aria-label="Filter"]')

        # Wait for the dialog to appear
        page.wait_for_selector('[role="dialog"]')

        # Click the "Deceased" filter button
        page.click('button:has-text("Deceased")')

        # Apply filters
        page.click('button:has-text("Save changes")')

        # Wait for the dialog to disappear
        page.wait_for_selector('[role="dialog"]', state='hidden')

        # Navigate to another page
        page.goto("http://localhost:5173/titans")

        # Navigate back to the heroes page
        page.goto("http://localhost:5173/heroes")

        # Wait for the gallery to load
        page.wait_for_selector('[aria-label="Ymir"]')

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
