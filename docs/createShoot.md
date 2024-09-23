**Create Shoot**
----
Create a new `Shoot` object

* **URL**

  `/shoot/`

* **Method:**

  `POST`

*  **URL Params**

  None

* **Data Params**
  **Required:**
  ```
  {
      "FireArm": 3,
      "Ammo": 3,
      "Rounds": 30,
      "Distance_Ft": 60
  }
  ```
  **Optional**
  ```
  {
      "Optic": null
  }
  ```

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```
    {
	    "Id": 1234,
	    "FireArm": 3,
	    "Ammo": 3,
	    "Rounds": 30,
	    "Distance_Ft": 60,
	    "Created": "2023-10-29 18:44:37",
	    "Optic": "null"
    }
    ```

* **Error Response:**

  * **Code:** 200
    **Content:** `{ error : "Access Denied. No Token Present." }`

    OR

   * **Code:** 200
      **Content:** `{ error : "Access Denied. Invalid Token." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/shoot/",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
