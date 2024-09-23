**Get TargetImage**
----
  Returns json data about a particular `TargetImage` object.

* **URL**

  `/target/:id`

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
	    "Id": 771,
	    "ShootId": 3,
	    "BinaryData": {type:"Buffer", data:[]},
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
      url: "/target/771",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
