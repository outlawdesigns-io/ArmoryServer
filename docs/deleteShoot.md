**Delete Shoot**
----
Delete an existing `Shoot` object.
>Note: When deleting a  `Shoot` , the associated `Ammo` object will **not** recoup the expended `rounds`.  

* **URL**

  `/shoot/:id`

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
        "Id": "1234"
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
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });
  ```
