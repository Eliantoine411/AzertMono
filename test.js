document.addEventListener("DOMContentLoaded", () => {
    // Generate keyboard keys
    const keyboard = document.getElementById("keyboard")
    const typeInput = document.getElementById("type-input")
    const dynamicText = document.getElementById("dynamic-text")

    // Define keyboard layout
    const keyboardRows = [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"],
        ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
    ]

    // Create keyboard
    keyboardRows.forEach((row) => {
        row.forEach((key) => {
            const keyElement = document.createElement("button")
            keyElement.className = "key"
            keyElement.textContent = key
            keyElement.dataset.key = key.toLowerCase()

            keyElement.addEventListener("mousedown", function() {
                this.classList.add("active")
                typeKey(key)
            })

            keyElement.addEventListener("mouseup", function() {
                this.classList.remove("active")
            })

            keyElement.addEventListener("mouseleave", function() {
                this.classList.remove("active")
            })

            keyboard.appendChild(keyElement)
        })
    })

    // Add special keys
    const spaceBar = document.createElement("button")
    spaceBar.className = "key space"
    spaceBar.textContent = "Space"
    spaceBar.dataset.key = " "

    spaceBar.addEventListener("mousedown", function() {
        this.classList.add("active")
        typeKey(" ")
    })

    spaceBar.addEventListener("mouseup", function() {
        this.classList.remove("active")
    })

    spaceBar.addEventListener("mouseleave", function() {
        this.classList.remove("active")
    })

    keyboard.appendChild(spaceBar)

    // Add backspace button
    const backspace = document.createElement("button")
    backspace.className = "key backspace"
    backspace.textContent = "Backspace"
    backspace.dataset.key = "backspace"

    backspace.addEventListener("mousedown", function() {
        this.classList.add("active")
        handleBackspace()
    })

    backspace.addEventListener("mouseup", function() {
        this.classList.remove("active")
    })

    backspace.addEventListener("mouseleave", function() {
        this.classList.remove("active")
    })

    keyboard.appendChild(backspace)

    // Make input field interactive
    typeInput.readOnly = false

    // Initialize text
    let currentText = "AZERT MONO"
    updateDisplayText()

    // Function to handle typing
    function typeKey(key) {
        if (currentText === "AZERT MONO") {
            currentText = ""
        }

        currentText += key

        // Limit text length
        if (currentText.length > 30) {
            currentText = currentText.slice(-30)
        }

        updateDisplayText()
    }

    // Function to handle backspace
    function handleBackspace() {
        if (currentText.length > 0) {
            currentText = currentText.slice(0, -1)
            updateDisplayText()
        }
    }

    // Function to update displayed text
    function updateDisplayText() {
        typeInput.value = currentText
        dynamicText.textContent = currentText || "Type something..."

        // Apply selected font style
        applyFontStyle()
    }

    // Listen for physical keyboard input
    typeInput.addEventListener("input", function(e) {
        currentText = this.value
        dynamicText.textContent = currentText || "Type something..."

        // Apply selected font style
        applyFontStyle()

        // Highlight the corresponding key on the virtual keyboard
        const lastChar = currentText.slice(-1).toLowerCase()
        const keyElements = document.querySelectorAll(".key")

        keyElements.forEach((key) => {
            if (key.dataset.key === lastChar) {
                key.classList.add("active")
                setTimeout(() => {
                    key.classList.remove("active")
                }, 150)
            }
        })
    })

    // Handle backspace key on physical keyboard
    typeInput.addEventListener("keydown", (e) => {
        if (e.key === "Backspace") {
            const backspaceKey = document.querySelector(".key.backspace")
            backspaceKey.classList.add("active")
            setTimeout(() => {
                backspaceKey.classList.remove("active")
            }, 150)
        }
    })

    // Font style selector functionality
    const fontStyleRadios = document.querySelectorAll('input[name="font-style"]')
    const italicCheckbox = document.querySelector('input[name="italic-style"]')

    // Fix the font style selection functionality
    // Replace the applyFontStyle function with this improved version:

    function applyFontStyle() {
        // Get selected font weight
        let selectedWeight = "regular"
        fontStyleRadios.forEach((radio) => {
            if (radio.checked) {
                selectedWeight = radio.value
            }
        })

        // Get italic state
        const isItalic = italicCheckbox.checked

        // Remove all font classes
        dynamicText.className = "dynamic-text azert-font"
        typeInput.className = "azert-font"

        // Add selected weight class
        if (selectedWeight !== "regular") {
            dynamicText.classList.add(`azert-font-${selectedWeight}`)
            typeInput.classList.add(`azert-font-${selectedWeight}`)
        }

        // Add italic class if selected
        if (isItalic) {
            dynamicText.classList.add("azert-font-italic")
            typeInput.classList.add("azert-font-italic")
        }

        // Log to confirm style is being applied
        console.log("Applied font style:", selectedWeight, isItalic ? "italic" : "")
    }

    // Add event listeners to font style selectors
    fontStyleRadios.forEach((radio) => {
        radio.addEventListener("change", applyFontStyle)
    })

    italicCheckbox.addEventListener("change", applyFontStyle)

    // Add this line after the font style selectors event listeners
    // Initialize font style
    applyFontStyle()

    // Update clock in status bar
    function updateClock() {
        const now = new Date()
        let hours = now.getHours()
        const minutes = now.getMinutes().toString().padStart(2, "0")
        const ampm = hours >= 12 ? "PM" : "AM"

        hours = hours % 12
        hours = hours ? hours : 12 // Convert 0 to 12

        document.querySelector(".clock").textContent = `${hours}:${minutes} ${ampm}`
    }

    updateClock()
    setInterval(updateClock, 60000) // Update every minute

    // Window controls functionality
    document.querySelectorAll(".window-close, .close-icon").forEach((button) => {
        button.addEventListener("click", function() {
            const section = this.closest(".os-window, .os-card, .gallery-card")
            if (section) {
                section.style.display = section.style.display === "none" ? "block" : "none"
            }
        })
    })

    // Typing effect for description
    const typingEffect = document.getElementById("typing-effect")
    const text = typingEffect.textContent
    typingEffect.textContent = ""

    let i = 0

    function typeWriter() {
        if (i < text.length) {
            typingEffect.textContent += text.charAt(i)
            i++
            setTimeout(typeWriter, 25)
        }
    }

    typeWriter()

    // Creator panels interaction
    document.querySelectorAll(".creator-panel").forEach((panel) => {
        panel.addEventListener("mouseenter", function() {
            this.style.boxShadow = "0 0 0 2px #000080"
        })

        panel.addEventListener("mouseleave", function() {
            this.style.boxShadow = "none"
        })
    })

    // File icons interaction
    document.querySelectorAll(".file-icon").forEach((icon) => {
        icon.addEventListener("mousedown", function() {
            this.style.borderStyle = "inset"
        })

        icon.addEventListener("mouseup", function() {
            this.style.borderStyle = "outset"
            const creator = this.getAttribute("data-creator")
            openCreatorModal(creator)
        })

        icon.addEventListener("mouseleave", function() {
            this.style.borderStyle = "outset"
        })
    })

    // Modal functionality
    function openCreatorModal(creator) {
        const modal = document.getElementById(`${creator}Modal`)
        const overlay = document.querySelector(".modal-overlay")

        if (modal) {
            modal.style.display = "block"
            overlay.style.display = "block"

            // Add draggable functionality
            makeDraggable(modal)
        }
    }

    // Close modals
    document.querySelectorAll(".modal-close, .modal-button").forEach((button) => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".creator-modal, .image-preview-modal").forEach((modal) => {
                modal.style.display = "none"
            })
            document.querySelector(".modal-overlay").style.display = "none"
        })
    })

    // Tab switching in modals
    document.querySelectorAll(".modal-tab").forEach((tab) => {
        tab.addEventListener("click", function() {
            const modal = this.closest(".creator-modal")
            const tabName = this.getAttribute("data-tab")
            const creator = modal.id.replace("Modal", "")

            // Deactivate all tabs and hide content
            modal.querySelectorAll(".modal-tab").forEach((t) => {
                t.classList.remove("active")
            })

            modal.querySelectorAll(".tab-content").forEach((content) => {
                content.style.display = "none"
            })

            // Activate selected tab and show content
            this.classList.add("active")
            document.getElementById(`${tabName}-${creator}`).style.display = "block"
        })
    })

    // Make elements draggable
    function makeDraggable(element) {
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0

        const header = element.querySelector(".modal-header")
        if (header) {
            header.onmousedown = dragMouseDown
        }

        function dragMouseDown(e) {
            e.preventDefault()
                // Get mouse position at startup
            pos3 = e.clientX
            pos4 = e.clientY
            document.onmouseup = closeDragElement
                // Call function whenever the cursor moves
            document.onmousemove = elementDrag
        }

        function elementDrag(e) {
            e.preventDefault()
                // Calculate new position
            pos1 = pos3 - e.clientX
            pos2 = pos4 - e.clientY
            pos3 = e.clientX
            pos4 = e.clientY
                // Set element's new position
            element.style.top = element.offsetTop - pos2 + "px"
            element.style.left = element.offsetLeft - pos1 + "px"
        }

        function closeDragElement() {
            // Stop moving when mouse button is released
            document.onmouseup = null
            document.onmousemove = null
        }
    }

    // Double-click effect for creator panels
    document.querySelectorAll(".creator-panel").forEach((panel) => {
        panel.addEventListener("dblclick", function() {
            const fileIcon = this.querySelector(".file-icon")
            if (fileIcon) {
                const creator = fileIcon.getAttribute("data-creator")
                openCreatorModal(creator)
            }
        })
    })

    // Gallery image preview functionality
    document.querySelectorAll(".image-container").forEach((container) => {
        container.addEventListener("click", function() {
            const img = this.querySelector("img")
            const modal = document.getElementById("imagePreviewModal")
            const previewImg = document.getElementById("preview-image")
            const previewTitle = document.getElementById("preview-image-title")
            const overlay = document.querySelector(".modal-overlay")

            // Set image source and title
            previewImg.src = img.src
            previewTitle.textContent = this.closest(".gallery-card").querySelector(".card-header span").textContent

            // Show modal
            modal.style.display = "block"
            overlay.style.display = "block"

            // Make modal draggable
            makeDraggable(modal)
        })
    })

    // GLIF section functionality
    // Generate glyphs for each category
    const uppercaseGrid = document.getElementById("uppercase-grid")
    const lowercaseGrid = document.getElementById("lowercase-grid")
    const numbersGrid = document.getElementById("numbers-grid")
    const punctuationGrid = document.getElementById("punctuation-grid")
    const symbolsGrid = document.getElementById("symbols-grid")

    // Define character sets
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const punctuation = ".,;:!?'\"-()[]{}"
    const symbols = "@#$%^&*+=<>|/\\~`_"

    // Generate glyphs for each category
    generateGlyphs(uppercase, uppercaseGrid)
    generateGlyphs(lowercase, lowercaseGrid)
    generateGlyphs(numbers, numbersGrid)
    generateGlyphs(punctuation, punctuationGrid)
    generateGlyphs(symbols, symbolsGrid)

    // GLIF section with keyboard-like layout
    // Replace the existing generateGlyphs function with this new version
    function generateGlyphs(chars, container) {
        // Clear existing content
        container.innerHTML = ""

        // Create keyboard-like layout
        const rows = []

        if (container.id === "uppercase-grid") {
            rows.push("QWERTYUIOP")
            rows.push("ASDFGHJKL")
            rows.push("ZXCVBNM")
        } else if (container.id === "lowercase-grid") {
            rows.push("qwertyuiop")
            rows.push("asdfghjkl")
            rows.push("zxcvbnm")
        } else if (container.id === "numbers-grid") {
            rows.push("1234567890")
            rows.push('-/:;()$&@"')
            rows.push(".,?!'")
        } else if (container.id === "punctuation-grid") {
            rows.push(",.;:!?'\"-()")
            rows.push("[]{}")
        } else if (container.id === "symbols-grid") {
            rows.push("@#$%^&*+=")
            rows.push("<>|/\\~`_")
        }

        rows.forEach((row) => {
            const rowDiv = document.createElement("div")
            rowDiv.className = "glif-row"

            row.split("").forEach((char) => {
                const glifItem = document.createElement("div")
                glifItem.className = "glif-item azert-font"
                glifItem.textContent = char
                glifItem.dataset.char = char

                glifItem.addEventListener("click", () => {
                    updateGlifInfo(char)
                })

                rowDiv.appendChild(glifItem)
            })

            container.appendChild(rowDiv)
        })
    }

    // Update glif info panel
    function updateGlifInfo(char) {
        const selectedGlif = document.getElementById("selected-glif")
        const glifCharName = document.getElementById("glif-char-name")
        const glifUnicode = document.getElementById("glif-unicode")
        const glifCategoryName = document.getElementById("glif-category-name")

        selectedGlif.textContent = char

        // Set character name
        let charName = ""
        let category = ""

        if (uppercase.includes(char)) {
            charName = `Latin Capital Letter ${char}`
            category = "Uppercase Letter"
        } else if (lowercase.includes(char)) {
            charName = `Latin Small Letter ${char}`
            category = "Lowercase Letter"
        } else if (numbers.includes(char)) {
            charName = `Digit ${char}`
            category = "Number"
        } else if (punctuation.includes(char)) {
            switch (char) {
                case ".":
                    charName = "Full Stop"
                    break
                case ",":
                    charName = "Comma"
                    break
                case ";":
                    charName = "Semicolon"
                    break
                case ":":
                    charName = "Colon"
                    break
                case "!":
                    charName = "Exclamation Mark"
                    break
                case "?":
                    charName = "Question Mark"
                    break
                case "'":
                    charName = "Apostrophe"
                    break
                case '"':
                    charName = "Quotation Mark"
                    break
                case "-":
                    charName = "Hyphen-Minus"
                    break
                case "(":
                    charName = "Left Parenthesis"
                    break
                case ")":
                    charName = "Right Parenthesis"
                    break
                case "[":
                    charName = "Left Square Bracket"
                    break
                case "]":
                    charName = "Right Square Bracket"
                    break
                case "{":
                    charName = "Left Curly Bracket"
                    break
                case "}":
                    charName = "Right Curly Bracket"
                    break
                default:
                    charName = "Punctuation Mark"
            }
            category = "Punctuation"
        } else if (symbols.includes(char)) {
            switch (char) {
                case "@":
                    charName = "At Sign"
                    break
                case "#":
                    charName = "Number Sign"
                    break
                case "$":
                    charName = "Dollar Sign"
                    break
                case "%":
                    charName = "Percent Sign"
                    break
                case "^":
                    charName = "Circumflex Accent"
                    break
                case "&":
                    charName = "Ampersand"
                    break
                case "*":
                    charName = "Asterisk"
                    break
                case "+":
                    charName = "Plus Sign"
                    break
                case "=":
                    charName = "Equals Sign"
                    break
                case "<":
                    charName = "Less-Than Sign"
                    break
                case ">":
                    charName = "Greater-Than Sign"
                    break
                case "|":
                    charName = "Vertical Line"
                    break
                case "/":
                    charName = "Solidus"
                    break
                case "\\":
                    charName = "Reverse Solidus"
                    break
                case "~":
                    charName = "Tilde"
                    break
                case "`":
                    charName = "Grave Accent"
                    break
                case "_":
                    charName = "Low Line"
                    break
                default:
                    charName = "Symbol"
            }
            category = "Symbol"
        }

        glifCharName.textContent = charName

        // Set Unicode value
        const unicode = char.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")
        glifUnicode.textContent = `U+${unicode}`

        glifCategoryName.textContent = category
    }

    // Category switching
    document.querySelectorAll(".glif-category").forEach((button) => {
        button.addEventListener("click", function() {
            const category = this.getAttribute("data-category")

            // Update active button
            document.querySelectorAll(".glif-category").forEach((btn) => {
                btn.classList.remove("active")
            })
            this.classList.add("active")

            // Show selected category
            document.querySelectorAll(".glif-grid").forEach((grid) => {
                grid.style.display = "none"
            })
            document.getElementById(`${category}-grid`).style.display = "grid"

            // Update info panel with first character of the category
            let firstChar = ""
            switch (category) {
                case "uppercase":
                    firstChar = "A"
                    break
                case "lowercase":
                    firstChar = "a"
                    break
                case "numbers":
                    firstChar = "0"
                    break
                case "punctuation":
                    firstChar = "."
                    break
                case "symbols":
                    firstChar = "@"
                    break
            }

            updateGlifInfo(firstChar)
        })
    })

    // Initialize with first uppercase character
    updateGlifInfo("A")

    // Mac OS 9 features
    // Play startup sound
    const startupSound = document.getElementById("mac-startup")
    if (startupSound) {
        setTimeout(() => {
            startupSound.play().catch((e) => console.log("Audio playback prevented: ", e))
        }, 1000)
    }

    // Show welcome alert
    const macAlert = document.getElementById("macAlert")
    if (macAlert) {
        setTimeout(() => {
            macAlert.style.display = "block"
            document.querySelector(".modal-overlay").style.display = "block"
        }, 2000)
    }

    // Alert OK button
    const alertOK = document.getElementById("alertOK")
    if (alertOK) {
        alertOK.addEventListener("click", () => {
            macAlert.style.display = "none"
            document.querySelector(".modal-overlay").style.display = "none"

            // Play click sound
            const clickSound = document.getElementById("mac-click")
            if (clickSound) {
                clickSound.play().catch((e) => console.log("Audio playback prevented: ", e))
            }
        })
    }

    // Desktop icons functionality
    document.querySelectorAll(".desktop-icon").forEach((icon) => {
        icon.addEventListener("click", function() {
            const sectionId = this.getAttribute("data-section")
            const section = document.getElementById(sectionId)

            if (section) {
                // Bring window to front
                document.querySelectorAll(".section").forEach((s) => {
                    s.style.zIndex = "1"
                })
                section.style.zIndex = "10"

                // Ensure it's visible
                section.style.display = "block"

                // Scroll to section
                section.scrollIntoView({ behavior: "smooth" })

                // Play click sound
                const clickSound = document.getElementById("mac-click")
                if (clickSound) {
                    clickSound.play().catch((e) => console.log("Audio playback prevented: ", e))
                }
            }
        })
    })

    // Double-click window header to collapse (window shade effect)
    document.querySelectorAll(".window-header").forEach((header) => {
        header.addEventListener("dblclick", function() {
            const window = this.closest(".section")
            const content = window.querySelector(".window-content")

            if (content.style.display === "none") {
                content.style.display = "block"
            } else {
                content.style.display = "none"
            }

            // Play click sound
            const clickSound = document.getElementById("mac-click")
            if (clickSound) {
                clickSound.play().catch((e) => console.log("Audio playback prevented: ", e))
            }
        })
    })

    // Make windows draggable
    document.querySelectorAll(".section").forEach((window) => {
        makeDraggable(window)
    })

    // Update all clocks
    function updateAllClocks() {
        const now = new Date()
        let hours = now.getHours()
        const minutes = now.getMinutes().toString().padStart(2, "0")
        const ampm = hours >= 12 ? "PM" : "AM"

        hours = hours % 12
        hours = hours ? hours : 12 // Convert 0 to 12

        const timeString = `${hours}:${minutes} ${ampm}`

        document.querySelectorAll(".clock").forEach((clock) => {
            clock.textContent = timeString
        })
    }

    updateAllClocks()
    setInterval(updateAllClocks, 60000) // Update every minute
})