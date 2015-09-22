
Welcome, invalid credentials or not auth 
Logout
----------------------------------------------------------------
ng-options for ssid.guest
----------------------------------------------------------------
CORS not opened to public
----------------------------------------------------------------
Save date/time 
----------------------------------------------------------------
countWatchers
<button ng-click="save()" class="btn btn-primary" type="button">
  Save <span class="badge">{{countsave}}</span>
</button>
----------------------------------------------------------------

[Expert@provider1w:0]# ./repishAddROBO Irek_Test_1100-35 192.168.35
 ROBO Irek_Test_1100-35 - Creation ended successfully.
 ROBO Irek_Test_1100-35 - SIC certificate creation details: The action has been completed successfully.
 ROBO Irek_Test_1100-35 - IKE certificate creation details: The action has been completed successfully.
 ROBO Irek_Test_1100-35 - Modification ended successfully.
 ROBO Irek_Test_1100-35 - Modification ended successfully.
Name            ID              Cluster ID      IP              Type            Version         Profile         Gateway status  Policy status   SIC DN          IKE DN          Dynamic-Objects
====            ==              ==              ==========      ====            =======         =======         ==============  =============   ======          ======          ===============
Irek_Test_1100-35       0.0.9.75        -       -       "VPN-1 Express/Pro ROBO"        R75.30  Standard_Office_1100    Waiting Waiting CN=Irek_Test_1100-35,O=repvpnsc1w.commonwealth.com.q6s9sk       "CN=Irek_Test_1100-35 VPN Certificate,O=repvpnsc1w.commonwealth.com.q6s9sk" -


[Expert@provider1w:0]# LSMcli 10.29.21.237 CPService IHateMundays1! Show -N=Not_Existing
 Failed to query table robo_gateways