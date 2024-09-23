**Delete Firearm**
----
Delete an existing `Firearm` object.

* **URL**

  `/firearm/:id`

* **Method:**

  `DELETE`

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
        "Message": "Target Object Deleted",
        "Id": "78910"
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
      url: "/firearm/78910",
      dataType: "json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });
  ```
