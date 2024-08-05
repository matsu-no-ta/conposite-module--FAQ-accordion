const accordion = () => {

    // アニメーションの時間とタイミング
    const animTiming = {
        duration: 400,
        easing: "ease-out",
    }

    // アコーディオンの中身がクローズする時のキーフレーム
    const closingAnimKeyframes = (content) => [
        {
            height: content.offsetHeight + "px",
            opacity: 1,
        },{
            height: 0,
            opacity: 0,
        }
    ];

    // アコーディオンの中身がオープンする時のキーフレーム
    const openingAnimKeyframes = (content) => [
        {
            height: 0,
            opacity: 0,
        },{
            height: content.offsetHeight + "px",
            opacity: 1,
        }
    ];

    // 全ての<.js-details>を取得してdetailsと定義する
    const details = document.querySelectorAll(".js-details");

    // detailsをループさせる （elementは各配列の要素）
    details.forEach((element) => {
        // 各配列の.js-summary を取得してsummaryと定義
        const summary = element.querySelector(".js-summary");
        // 各配列の.js-content を取得してcontentと定義
        const content = element.querySelector(".js-content");

        // summaryがクリックイベントが発生した時
        summary.addEventListener("click", (event) => {
            event.preventDefault();  //要素に設定された規定の動作をキャンセル

            // detailsにopen属性がなかったら
            if(element.open) {
                // アコーディオンの中身を閉じる時の処理
                const closingAnim = content.animate(closingAnimKeyframes(content),animTiming);
                // アイコン操作のis-openの切り替え（クラスを取り除く）
                element.classList.toggle("is-open");

                // アコーディオンアニメーション終了後
                closingAnim.onfinish = () => {
                    // open属性を取り除く
                    element.removeAttribute("open");
                };
            } else {
                // 要素にopen属性がついたとき（trueのとき）
                element.setAttribute("open", "true");

                // アコーディオンの中身を開く時の処理
                const openingAnim = content.animate(openingAnimKeyframes(content), animTiming);
                // アイコン操作のis-openの切り替え（クラスを加える）
                element.classList.toggle("is-open");
            }
        });
    });
}

accordion();