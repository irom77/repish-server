exec('ls -lh', 'ubuntu@my-remote.com').on('error', function(e) {
console.log('ERROR', e);
}).pipe(process.stdout)
----------------------------------------------------------------
npm remotely to replace npm ssh-exec 
----------------------------------------------------------------
add err for page not found
----------------------------------------------------------------
more use of win to not run redis
----------------------------------------------------------------
logout based on token
----------------------------------------------------------------
linux try redirect 2>&1 etc
----------------------------------------------------------------
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


[Expert@provider1w:0]# LSMcli 10.29.21.237 user password Show -N=Not_Existing
 Failed to query table robo_gateways