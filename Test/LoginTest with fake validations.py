from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import WebDriverException
import time

# Initialize WebDriver
try:
    driver = webdriver.Chrome()

    # Open the login page
    driver.get("http://localhost:5173/login")  # Ensure this is the correct path for your login page

    # Maximize the window
    driver.maximize_window()

    # Wait for the page to load
    time.sleep(3)

    # Find the email input field and enter the email
    email_field = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
    email_field.send_keys("mahinda@fake.com")

    # Find the password input field and enter the password
    password_field = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
    password_field.send_keys("appachi123")

    # (Optional) Find and click the "Keep me logged in" checkbox
    keep_logged_in_checkbox = driver.find_element(By.ID, "keepLoggedIn")
    if not keep_logged_in_checkbox.is_selected():
        keep_logged_in_checkbox.click()

    # Find the login button and submit the form
    login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    login_button.click()

    # Wait for a few seconds for the login to process
    time.sleep(5)

    # Check if the URL has changed after login
    current_url = driver.current_url
    if current_url != "http://localhost:5173/login":
        print("Login successful, redirected to:", current_url)
    else:
        print("Login failed, still on login page")

    # Close the browser
    driver.quit()

except WebDriverException as e:
    print("WebDriverException:", e)
