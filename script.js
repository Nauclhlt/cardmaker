const cardImage = document.createElement("canvas");
cardImage.width = 800;
cardImage.height = 600;
const template = document.createElement("img");
let loaded = false;
template.src = "assets/template.png";
template.addEventListener("load", function () {
    loaded = true;
});

const COLOR_MAP = {
    灰: "lightgray",
    茶:"#8f431a",
    緑:"#04d600",
    水:"aqua",
    青:"#0040ff",
    黄:"yellow",
    橙:"orange",
    赤: "red",
    銅: "red",
    銀: "red",
    金: "red",
    紫: "purple"
};

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

    let atcoderRating = tryExtractRating(atcoder);
    let cdfRating = tryExtractRating(codeforces);
    let atcoderColor = "white";
    let cdfColor = "white";
    
    if (atcoderRating != -1)
    {
        atcoderColor = colorFromRating(atcoderRating);
    }

    if (atcoderColor == "white")
    {
        atcoderColor = findColorName(atcoder);
    }

    if (cdfRating != -1)
    {
        cdfColor = colorFromRatingCodeforces(cdfRating);
    }

    if (cdfColor == "white")
    {
        cdfColor = findColorName(codeforces);
    }

    c.drawImage(template, 0, 0);

    c.font = "28px 'M PLUS 1p'";

    
    
    drawOutlined(c, name, 360 - c.measureText(name).width, 134);

    drawOutlined(c, preflang, 360 - c.measureText(preflang).width, 216);

    drawOutlined(c, gender, 729 - c.measureText(gender).width, 134);

    drawOutlined(c, exp, 729 - c.measureText(exp).width, 216);

    //drawOutlined(c, atcoder, 180, 348);
    drawColored(c, atcoder, 180, 348, atcoderColor);
    
    //drawOutlined(c, codeforces, 215, 385);
    drawColored(c, codeforces, 215, 385, cdfColor);


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

function tryExtractRating(str)
{
    let len = -1;
    let val = 0;
    for (let l = 0; l < str.length; l++)
    {
        for (let r = l + 1; r <= str.length; r++)
        {
            let s = str.substring(l, r);
            if (!isNaN(s))
            {
                let p = parseInt(s);
                if (r - l > len)
                {
                    len = r - l;
                    val = p;
                }
            }
        }
    }

    if (len == -1)
    {
        return -1;
    }
    else
    {
        return val;
    }
}

function colorFromRating(rating)
{
    if (rating < 400)
    {
        return "lightgray";
    }
    else if (rating < 800)
    {
        return "#8f431a";
    }
    else if (rating < 1200)
    {
        return "#04d600";
    }
    else if (rating < 1600)
    {
        return "aqua";
    }
    else if (rating < 2000)
    {
        return "#0040ff";
    }
    else if (rating < 2400)
    {
        return "yellow";
    }
    else if (rating < 2800)
    {
        return "orange";
    }
    else
    {
        return "red";
    }
}

function colorFromRatingCodeforces(rating)
{
    if (rating < 1200)
    {
        return "lightgray";
    }
    else if (rating < 1400)
    {
        return "#04d600";
    }
    else if (rating < 1600)
    {
        return "aqua";
    }
    else if (rating < 1900)
    {
        return "#0040ff";
    }
    else if (rating < 2100)
    {
        return "purple";
    }
    else if (rating < 2400)
    {
        return "orange";
    }
    else
    {
        return "red";
    }
}

function findColorName(text)
{
    for (let key in COLOR_MAP)
    {
        if (text.includes(key))
        {
            return COLOR_MAP[key];
        }
    }

    return "white";
}

function drawOutlined(c, text, x, y)
{
    c.fillStyle = "#ff0088";

    c.fillText(text, x + 1, y + 1, 999999);

    c.fillStyle = "white";

    c.fillText(text, x, y, 999999);
}

function drawColored(c, text, x, y, color)
{
    c.fillStyle = "black";

    c.fillText(text, x + 2, y + 2, 999999);

    c.fillStyle = color;

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