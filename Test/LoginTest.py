from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException
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
    email_field.send_keys("mahinda@gmail.com")

    # Find the password input field and enter the password
    password_field = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
    password_field.send_keys("appachi123")

    # Find the login button and submit the form
    login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    login_button.click()

    # Wait for the URL to change from the login page URL
    try:
        WebDriverWait(driver, 10).until(EC.url_contains("/"))  # Assuming the URL changes on login, adjust this path if necessary
        print("Login successful!")
    except TimeoutException:
        print("Login failed. The URL did not change after login.")

    # Close the browser
    driver.quit()

except WebDriverException as e:
    print("WebDriverException:", e)
