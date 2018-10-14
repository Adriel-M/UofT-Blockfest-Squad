import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class webDriver {

	public static void main(String[] args) throws IOException {
		System.setProperty("webdriver.chrome.driver","C:\\Webdrivers\\chromedriver.exe");
		websitePrinter(websiteReader("https://www.google.com/"));
		
		
		
		
		/*WebElement element = driver.findElement(By.name("q"));
		
		element.sendKeys("terminator\n");
		
		new WebDriverWait(driver, 10).until(d -> d.getTitle().toLowerCase().startsWith("terminator"));
	
		System.out.println("Title: " + driver.getTitle());
		
		driver.quit();
		
		*/
	}
	
	public static WebDriver websiteReader(String websiteName) {
		WebDriver driver = new ChromeDriver();	//specifically for Chrome reading
		driver.get(websiteName);
		
		return driver;
	}
	public static void websitePrinter(WebDriver driver) throws IOException {
		File file = new File("C:/index.html");
		FileWriter fw = new FileWriter(file);
		BufferedWriter bw = new BufferedWriter(fw);
		bw.write(driver.getPageSource());
		driver.close();
	    driver.quit();
	    
	}
	
	
}
