**Get All Ammo**
----
  Returns json array of all `Ammo` objects.

* **URL**

  `/ammo/`

* **Method:**

  `GET`

*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200
    **Content:**
    ```
    [
	  {
	    "Id": 2,
	    "Manufacturer": 13,
	    "Caliber": 2,
	    "BulletWeight": 124,
	    "Casing": "Brass",
	    "BulletType": "FMJ (Copper)",
	    "MuzzleVelocity": 3000,
	    "Rounds": 800
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
      url: "/ammo/",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
