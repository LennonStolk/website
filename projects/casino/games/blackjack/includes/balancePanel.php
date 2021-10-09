<div style="position: absolute; bottom: 0; left: 0; display: flex; flex-wrap: wrap; width: 250px; height: 125px; font-size: 30px; background: linear-gradient(38deg, rgb(120, 120, 120) 35%, rgb(90, 90, 90) 100%); border-radius: 10px;">
    <div id="balancePanelUsername" style="width: 250px; color: white; padding: 10px;"></div>
    <div id="balancePanelBalance" style="padding: 10px; color: yellow"></></div>
    <div id="balancePanelChange" style="padding: 10px;"></></div>
</div>

<script>
    let previousbalance = null;
    let change = null;

    async function refreshBalancePanel() {
        let rawBalanceData = await fetch(`controllers/getBalance.php`);
        balanceData = await rawBalanceData.json();

        let username = balanceData[0];
        let balance = balanceData[1];
        if (previousbalance != null) {
            change = balance - previousbalance;
        }
        previousbalance = balance;
        
        document.getElementById("balancePanelUsername").innerText = username;
        document.getElementById("balancePanelBalance").innerText = balance;
        if (change != null) {
            if (change > 0) {
                let changeText = "+" + change;
                document.getElementById("balancePanelChange").style.color = "lime";
                document.getElementById("balancePanelChange").innerText = changeText;
                setTimeout(refreshBalancePanel, 2000);
            }
            if (change == 0) {
                document.getElementById("balancePanelChange").innerText = "";
            }
            if (change < 0) {
                document.getElementById("balancePanelChange").style.color = "red";
                document.getElementById("balancePanelChange").innerText = change;
                setTimeout(refreshBalancePanel, 2000);
            }
        }
    }
</script>