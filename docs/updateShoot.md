
**Update Shoot**
----
Update the properties of an existing `Shoot` object.

* **URL**

  `/shoot/:id`

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  ```
  {
      "Distance_Ft": 90,
      "Optic": 2
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
	    "Distance_Ft": 90,
	    "Created": "2023-10-29 18:44:37",
	    "Optic": 2
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
      url: "/shoot/1234",
      dataType: "json",
      type : "PUT",
      success : function(r) {
        console.log(r);
      }
    });
  ```
