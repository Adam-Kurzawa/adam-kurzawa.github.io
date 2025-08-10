// https://play.jqlang.org/

// stary format na nowy (wszystko do type = 'text')
.chapters = (.chapters | map(
        map({type: "text", value: .})
    )
)

// uwzględnia dialogi
.chapters = (.chapters | map(
        map(
            if startswith("–")
            then {type: "dialog", value: .}
            else {type: "text", value: .}
            end
        )
    )
)

