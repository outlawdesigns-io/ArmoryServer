**Get Shoot TargetImages**
----
Get all `TargetImage` objects associated with a given `Shoot` object.

* **URL**

  `/shoot/:id/target`

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
    [
	  {
	    "Id": 765,
	    "ShootId": 3,
	    "BinaryData": {type:"Buffer", data:[...]}
	  },
    ....]
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
      url: "/shoot/1234/target",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
