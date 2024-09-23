**Create Ammo**
----
Create a new `Ammo` object

* **URL**

  `/ammo/`

* **Method:**

  `POST`

*  **URL Params**

    None

* **Data Params**
  **Required:**
  ```
  {
      "Manufacturer": "13",
      "Caliber": "2"
  }
  ```
  **Optional**
  ```
  {
      "BulletWeight": 124,
      "Casing": "Brass",
      "BulletType": "FMJ (Copper)",
      "MuzzleVelocity": 3000,
      "Rounds":800
  }
  ```

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
    **Content:** `{ error : "Access Denied. No Token Present." }`

    OR

   * **Code:** 200
      **Content:** `{ error : "Access Denied. Invalid Token." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/ammo/",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
