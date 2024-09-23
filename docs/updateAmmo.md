**Update Ammo**
----
Update the properties of an existing `Ammo` object.

* **URL**

  `/ammo/:id`

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  ```
  {
      "Rounds": 770,
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```
	  {
	    "Id": 2,
	    "Manufacturer": 13,
	    "Caliber": 2,
	    "BulletWeight": 124,
	    "Casing": "Brass",
	    "BulletType": "FMJ (Copper)",
	    "MuzzleVelocity": 3000,
	    "Rounds": 770
	  }
    ```

* **Error Response:**

  * **Code:** 200 <br />
    **Content:** `{ error : "Access Denied. No Token Present." }`

  OR

    * **Code:** 200 <br />
      **Content:** `{ error : "Access Denied. Invalid Token." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/ammo/2",
      dataType: "json",
      type : "PUT",
      success : function(r) {
        console.log(r);
      }
    });
  ```
