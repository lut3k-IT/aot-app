from playwright.sync_api import Page, expect
import re

def test_quiz_fixes(page: Page):
    page.goto("http://localhost:5174/quiz")

    # Verify styling fix
    page.get_by_role("button", name=re.compile("Linked Horizon", re.IGNORECASE)).click()
    expect(page.get_by_role("button", name=re.compile("Next Question", re.IGNORECASE))).to_be_visible()
    page.screenshot(path="jules-scratch/verification/quiz_styling_fix.png")
    page.get_by_role("button", name=re.compile("Next Question", re.IGNORECASE)).click()

    # Finish the quiz to verify translations
    page.get_by_role("button", name=re.compile("He fled, saving Eren and Mikasa", re.IGNORECASE)).click()
    page.get_by_role("button", name=re.compile("Next Question", re.IGNORECASE)).click()

    page.get_by_role("button", name=re.compile("Eren Jaeger", re.IGNORECASE)).click()
    page.get_by_role("button", name=re.compile("Next Question", re.IGNORECASE)).click()

    page.get_by_role("button", name=re.compile("Events long before the main plot", re.IGNORECASE)).click()
    page.get_by_role("button", name=re.compile("Next Question", re.IGNORECASE)).click()

    page.get_by_role("button", name=re.compile("For Annie", re.IGNORECASE)).click()
    page.get_by_role("button", name=re.compile("Next Question", re.IGNORECASE)).click()

    page.get_by_role("button", name=re.compile("Hand-to-hand combat", re.IGNORECASE)).click()

    # Verify translation fixes
    expect(page.get_by_text("Quiz Completed!")).to_be_visible()
    expect(page.get_by_text(re.compile("Your score: 6 / 6", re.IGNORECASE))).to_be_visible()
    expect(page.get_by_text(re.compile("Best Score: 6 / 6", re.IGNORECASE))).to_be_visible()
    page.screenshot(path="jules-scratch/verification/quiz_translation_fix.png")
