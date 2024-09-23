**Get Shoot**
----
  Returns json data about a particular `Shoot` object.

* **URL**

  `/shoot/:id`

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  None

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
    **Content:** `{ error : "Invalid UID" }`

  OR

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
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
