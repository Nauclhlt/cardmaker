const cardImage = document.createElement("canvas");
cardImage.width = 800;
cardImage.height = 600;
const template = document.createElement("img");
let loaded = false;
template.src = "assets/template.png";
template.addEventListener("load", function () {
    loaded = true;
});

window.addEventListener("load", function () {
    document.getElementById("generate-button").addEventListener("click", function () {
        generateCardImage();
        updatePreview();
    });
    document.getElementById("download-button").addEventListener("click", function () {
        generateCardImage();
        downloadCardImage();
    });
});

function generateCardImage()
{
    if (!loaded) return;

    const c = cardImage.getContext("2d");
    c.clearRect(0, 0, 800, 600);

    let name = document.getElementById("name-input").value;
    let preflang = document.getElementById("preflang-input").value;
    let gender = document.getElementById("gender-input").value;
    if (gender == "男") gender = "♂️";
    else if (gender == "女") gender = "♀️";
    let exp = document.getElementById("exp-input").value;
    let atcoder = document.getElementById("rating-atcoder-input").value;
    let codeforces = document.getElementById("rating-codeforces-input").value;
    let other = document.getElementById("rating-other-input").value;
    let bestalgo = document.getElementById("best-algo-input").value;
    let comment = document.getElementById("comment-input").value;

    c.drawImage(template, 0, 0);

    c.font = "28px 'M PLUS 1p'";

    
    
    drawOutlined(c, name, 360 - c.measureText(name).width, 134);

    drawOutlined(c, preflang, 360 - c.measureText(preflang).width, 216);

    drawOutlined(c, gender, 729 - c.measureText(gender).width, 134);

    drawOutlined(c, exp, 729 - c.measureText(exp).width, 216);

    drawOutlined(c, atcoder, 180, 348);
    
    drawOutlined(c, codeforces, 215, 385);


    c.font = "22px 'M PLUS 1p'";

    {
        let split = other.split("\n");
        for (let i = 0; i < split.length; i++)
        {
            drawOutlined(c, split[i], 70, 450 + 25 * i);
        }
    }

    {
        let split = bestalgo.split("\n");
        for (let i = 0; i < split.length; i++)
        {
            drawOutlined(c, split[i], 424, 325 + 25 * i);
        }
    }

    c.font = "21px 'M PLUS 1p'";
    

    {
        let split = comment.split("\n");
        for (let i = 0; i < split.length; i++)
        {
            drawOutlined(c, split[i], 424, 490 + 24 * i);
        }
    }
}

function drawOutlined(c, text, x, y)
{
    c.fillStyle = "#ff0088";

    c.fillText(text, x + 1, y + 1, 999999);

    c.fillStyle = "white";

    c.fillText(text, x, y, 999999);

    
}

function updatePreview()
{
    const preview = document.getElementById("preview-image");
    preview.src = cardImage.toDataURL();
    const container = document.getElementById("preview-container");
    container.style.visibility = "visible";
}

function downloadCardImage()
{
    let link = document.createElement("a");
    link.href = cardImage.toDataURL("image/png");
    link.download = "card.png";
    link.click();
}