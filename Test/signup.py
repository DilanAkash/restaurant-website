from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException

# Initialize WebDriver
driver = webdriver.Chrome()

try:
    # Open the signup page
    driver.get("http://localhost:5173/signup")  # Ensure this is the correct path for your signup page

    # Maximize the window
    driver.maximize_window()

    # Find the form fields and fill them in
    driver.find_element(By.CSS_SELECTOR, "input[placeholder='Name']").send_keys("Mahinda Rajapaksa")
    driver.find_element(By.CSS_SELECTOR, "input[placeholder='Email']").send_keys("mahinda@gmail.com")
    driver.find_element(By.CSS_SELECTOR, "input[placeholder='Phone Number']").send_keys("071 234 5678")
    driver.find_element(By.CSS_SELECTOR, "input[placeholder='Password']").send_keys("appachi123")
    driver.find_element(By.CSS_SELECTOR, "input[placeholder='Confirm Password']").send_keys("appachi123")

    # Submit the form by clicking the signup button
    signup_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    signup_button.click()

    # Wait for either a success or error message
    try:
        success_message = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "p.text-green-500"))  # Adjust the selector as necessary
        )
        print("Signup successful:", success_message.text)
    except TimeoutException:
        # If the success message is not found, check for an error message
        try:
            error_message = driver.find_element(By.CSS_SELECTOR, "p.text-red-500")  # Adjust the selector as necessary
            print("Signup failed. Error message:", error_message.text)
        except:
            print("Signup failed. No error message found.")

    # Close the browser
    driver.quit()

except WebDriverException as e:
    print("WebDriverException:", e)
