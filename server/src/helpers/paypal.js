import paypal from 'paypal-rest-sdk'

paypal.configure({
    mode: "sandbox",
    client_id: "AWdHDR_zwe3sljbW2cKy_NRU70MEI8Z3cnYPIDErs5wF2hCiCPyqK9KhVEDokIYjpn9N5VEYRq6IqKGk",
    client_secret: "EPl7d4i_3a9zZoWNgDBa4Qybu_uDdt1HOoUPQUeVw6PWgSrQqOPIBKc8R1bfrRH_Bxoq2fpIQNSERKwq",
  });
  
 export default paypal;