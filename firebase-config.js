// Client-side Firebase configuration already used by the owner's shared apps.
// These values identify the public web app; do not store private information in tasks.
export const firebaseConfig = {
  apiKey: "AIzaSyDBBD1W-zneFDNi1eZCtYqvyoXyJcmdk0k",
  authDomain: "warikan-app-120fd.firebaseapp.com",
  databaseURL: "https://warikan-app-120fd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "warikan-app-120fd",
  storageBucket: "warikan-app-120fd.firebasestorage.app",
  messagingSenderId: "43289931875",
  appId: "1:43289931875:web:ca26551e40da813b9e4856",
};

// 婚姻チェックリストのデータ保存先（他アプリのデータとは分離）。
export const DATA_PATH = "marriage-procedure/v1";
// 2人で同じこの鍵を使うと同じリストに同期されます（変えると別リスト）。
export const GROUP_KEY = "marriage-procedure-2f9d4c7a8e";

/*
  Runtime correction for the Dossenheim Ehefaehigkeitszeugnis flow.
  Reason: the certificate was received without Apostille, so the public page
  must show Apostille as a separate step before shipping the original to Japan.
  Keep this patch free of private addresses, emails, passport numbers, and IDs.
*/
(function patchDossenheimApostilleFlow(){
  function setPairText(root, selector, jaText, deText){
    var el = root && root.querySelector(selector);
    if(!el) return;
    var ja = el.querySelector(".ja");
    var de = el.querySelector(".de");
    if(ja) ja.textContent = jaText;
    if(de) de.textContent = deText;
  }

  function formatPlanDate(offsetDays){
    var input = document.getElementById("planDate");
    if(!input || !input.value) return "希望日を入力";
    var parts = input.value.split("-").map(function(v){ return parseInt(v, 10); });
    if(parts.length !== 3 || parts.some(function(v){ return isNaN(v); })) return "希望日を入力";
    var d = new Date(parts[0], parts[1] - 1, parts[2] + offsetDays);
    var pad = function(n){ return n < 10 ? "0" + n : String(n); };
    return d.getFullYear() + "." + pad(d.getMonth() + 1) + "." + pad(d.getDate());
  }

  function patch(){
    var steps = Array.prototype.slice.call(document.querySelectorAll(".route-step"));
    var issueStep = steps.filter(function(step){
      return step.textContent.indexOf("アポスティーユ付き婚姻要件具備証明書") >= 0 ||
             step.textContent.indexOf("Ehefähigkeitszeugnis mit Apostille") >= 0;
    })[0];
    if(!issueStep || issueStep.getAttribute("data-apostille-flow-patched") === "1") return;
    issueStep.setAttribute("data-apostille-flow-patched", "1");

    setPairText(
      issueStep,
      "h3",
      "婚姻要件具備証明書をお父さまが受領",
      "Vater empfängt das Ehefähigkeitszeugnis"
    );

    var detail = issueStep.querySelector(".route-detail");
    if(detail){
      detail.innerHTML = '<span class="ja">今回の手配では、証明書はアポスティーユなしで受領します。受領後、ドイツ側の管轄機関で別途アポスティーユを取得します。発行後6か月有効。</span><span class="de">In diesem Verfahren wird das Zeugnis ohne Apostille empfangen. Nach Erhalt wird die Apostille separat bei der zuständigen deutschen Behörde eingeholt. Sechs Monate ab Ausstellung gültig.</span>';
    }

    var receiptLabel = issueStep.querySelector('input[data-id="dor4"]');
    if(receiptLabel){
      var receipt = receiptLabel.closest(".route-check");
      setPairText(receipt, "span:last-child", "原本受領完了", "Original erhalten");
    }

    var apostilleInput = issueStep.querySelector('input[data-id="dorApostille"]');
    var apostilleLabel = apostilleInput ? apostilleInput.closest(".route-check") : null;
    if(apostilleLabel){
      setPairText(apostilleLabel, "span:last-child", "アポスティーユ取得完了", "Apostille erledigt");
      apostilleLabel.remove();
    } else {
      apostilleLabel = document.createElement("label");
      apostilleLabel.className = "route-check";
      apostilleLabel.innerHTML = '<input type="checkbox" data-id="dorApostille"><span class="box"></span><span><span class="ja">アポスティーユ取得完了</span><span class="de">Apostille erledigt</span></span>';
    }

    var apostilleStep = document.createElement("div");
    apostilleStep.className = "route-step";
    apostilleStep.setAttribute("data-runtime-step", "ehefaehigkeitszeugnis-apostille");
    apostilleStep.innerHTML = [
      '<div class="route-dates">',
      '  <div class="route-when"><span class="ja">予定・7週前</span><span class="de">Plan · 7 Wochen vorher</span> <strong id="dosDueApostille">' + formatPlanDate(-49) + '</strong></div>',
      '  <span class="route-delta soon"><span class="ja">証明書受領後に実施</span><span class="de">nach Erhalt des Zeugnisses</span></span>',
      '</div>',
      '<h3><span class="ja">婚姻要件具備証明書にアポスティーユを付ける</span><span class="de">Apostille für das Ehefähigkeitszeugnis einholen</span></h3>',
      '<div class="road-meta"><span class="road-chip"><span class="ja">担当: お父さま側で手配</span><span class="de">Organisation durch Vater</span></span><span class="road-chip time"><span class="ja">目安: 1週間確保</span><span class="de">Puffer: 1 Woche</span></span></div>',
      '<div class="route-detail"><span class="ja">Dossenheim発行の婚姻要件具備証明書に、ドイツ側の管轄機関でアポスティーユを付けます。アポスティーユ取得後の原本を日本へ発送します。</span><span class="de">Für das von Dossenheim ausgestellte Ehefähigkeitszeugnis wird die Apostille bei der zuständigen deutschen Behörde eingeholt. Erst das Original mit Apostille wird nach Japan geschickt.</span></div>',
      '<div class="route-detail"><span class="ja">管轄は Regierungspräsidium Karlsruhe 等に確認。ドイツ大使館・在日ドイツ大使館ではアポスティーユを発行しません。</span><span class="de">Zuständigkeit bei Regierungspräsidium Karlsruhe o. ä. klären. Die Deutsche Botschaft stellt keine Apostille aus.</span></div>'
    ].join("");
    apostilleStep.appendChild(apostilleLabel);

    var shipStep = steps.filter(function(step){
      return step.textContent.indexOf("日本へ発送し、彼女が原本を受領") >= 0 ||
             step.textContent.indexOf("Nach Japan senden") >= 0;
    })[0];
    if(shipStep){
      shipStep.parentNode.insertBefore(apostilleStep, shipStep);
      var shipDetail = shipStep.querySelector(".route-detail");
      if(shipDetail){
        shipDetail.innerHTML = '<span class="ja">送る物は、アポスティーユ取得後の婚姻要件具備証明書の原本。日本語訳を日本で作成する場合でも、必ずアポスティーユ取得後の原本を発送します。</span><span class="de">Versandt wird das Original des Ehefähigkeitszeugnisses nach Erteilung der Apostille. Auch wenn die japanische Übersetzung in Japan erstellt wird, wird zuerst das Original mit Apostille versandt.</span>';
      }
    } else {
      issueStep.parentNode.insertBefore(apostilleStep, issueStep.nextSibling);
    }

    var planDate = document.getElementById("planDate");
    if(planDate && !planDate.getAttribute("data-apostille-patch-listener")){
      planDate.setAttribute("data-apostille-patch-listener", "1");
      planDate.addEventListener("change", function(){
        var due = document.getElementById("dosDueApostille");
        if(due) due.textContent = formatPlanDate(-49);
      });
    }
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", patch);
  } else {
    patch();
  }
  setTimeout(patch, 300);
})();
