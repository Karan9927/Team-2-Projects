INVOICE_Generator

This is a link to use Invoice Generator made by me=>https://karan9927.github.io/Team-2-Projects/tanishka_invoice_generator/

Here is a view of my page->
<img width="945" alt="Screenshot 2023-12-06 183214" src="https://github.com/Karan9927/Team-2-Projects/assets/127411985/eda4695e-8678-465b-b2e6-ceb6a555d88f">
<img width="947" alt="Screenshot 2023-12-06 183238" src="https://github.com/Karan9927/Team-2-Projects/assets/127411985/0e15c92c-a3bd-4dd6-9bb2-4a31d40512a8">
HTML

HTML includes input sections for invoice details, dates, company information, a list of items with prices and quantities, additional charges, and a button to generate the invoice. The page also contains a preview section with details dynamically filled from the input, allowing users to save, print, or download the generated invoice. The code is linked to external CSS and JavaScript files for styling and functionality.

css

Used Normal properties for styling.

Java Script

AddList():

Purpose: 1.This function is triggered when the "Add" button is clicked to add a new item to the invoice.
      2. It dynamically creates a new list item with input fields for item details (name, price, quantity, and total), and 
         it appends this new item to the list of items in the invoice.

         
addBtn():

Purpose: 1.This function is called to add functionality to the "add" button within each list item.
          2.It validates the input fields for the current list item, calculates the total amount for that item, and updates 
            the total amount for the entire invoice. It also updates the display and behavior of the "add" button.

            
list_Detail():

Purpose: 1.This function sets up event listeners for changes in the item's price and quantity fields.
         2.When these fields are modified, the function calculates and updates the total amount for the specific item 
              and triggers a function (TotalChange()) to potentially perform additional actions with the updated totals.

              
TotalChange():

 Purpose: 1.This function is currently incomplete, but it appears to be intended to log the values of the total 
               amount for each item. It is called when the totals are changed in the list_Detail() function.

               
AddList_InVoice(det):

Purpose: 1.This function is called when an item is added to the invoice, and it dynamically creates a 
                 corresponding item in the invoice preview section. It takes the details of the added item as a parameter 
                and appends the details to the preview.

                
TotalCount(det):

Purpose: 1.This function is called to update the total amount for the entire invoice when a new item is added.
         2.It takes the details of the last added item as a parameter, extracts the total amount, and updates 
         the cumulative total amount for the invoice.

                       
validateForm(det):

Purpose: 1.This function is called to validate the input fields for each list item before adding a new item.
         2.It checks if any of the required fields (item name, price, or quantity) are empty and displays an 
         error message if so. It returns a boolean indicating whether the validation passed.

                         
validData():

Purpose: 1.This function is called to check if all the required fields in the invoice form are filled before 
generating the invoice.
2.It checks if essential fields (invoice number, company details, billing details, dates) are not empty and alerts             the user if any field is missing.

          
document.getElementById('pri-btn').addEventListener('click', ...):

 Purpose: 1.This event listener is triggered when the "Print" button is clicked in the preview                                             section.
2.It hides the details section, adjusts the styling for printing, and prints the                                                 invoice using window.print(). After printing, it restores the original display                                                state.

                                        
document.getElementById('save').addEventListener('click', ...):

 Purpose: 1.This event listener is triggered when the "Download" button is clicked in the                                                 preview section.
 2.It uses the html2pdf library to convert the invoice preview into a PDF file and                                              triggers the download of the generated PDF.

                                        
These functions collectively handle the dynamic addition of items to the invoice, update totals, validate input, and control the printing and saving of the invoice.
