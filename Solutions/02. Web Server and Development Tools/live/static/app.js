function getMessage() {
    $.get("data/messages")
        .then(messages => {
            $(messages).each((i, m) => $("body").append($("<p>").text(m)));
        });
}