**Get Ammo**
----
  Returns json data about a particular `Ammo` object.

* **URL**

  `/ammo/:id`

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
	    "Id": 2,
	    "Manufacturer": 13,
	    "Caliber": 2,
	    "BulletWeight": 124,
	    "Casing": "Brass",
	    "BulletType": "FMJ (Copper)",
	    "MuzzleVelocity": 3000,
	    "Rounds": 800
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
      url: "/ammo/2",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
