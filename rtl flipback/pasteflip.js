
         // document.execCommand("copy");
         var ae = document.activeElement
       var t = document.createElement("textarea");
      document.body.appendChild(t);
      t.focus();
      document.execCommand("paste");
      var clipboardText = t.value; //this is your clipboard data
     t.value=reverseIt(clipboardText);
     t.focus();
     t.select();
     document.execCommand("copy");
      document.body.removeChild(t);
    ae.focus();
      document.execCommand("paste");
      function wrapLines(val) {
        /* make sure  all wrap generated lines */
        let results = "";
        let textElm = figma.createText();
        const tf = figma.currentPage.selection[0];
        let fon = tf.fontName;
        //figma.loadFontAsync({ family: fon.family, style: fon.style}).then((res)=>{
        let curLine = "";
        let curLineWidth = 0;
        for (let i = 0; i < val.length; i++) {
            let curLetter = val.substr(i, 1);
            textElm.fontName = tf.fontName;
            textElm.fontSize = tf.fontSize;
            textElm.characters = curLine + curLetter;
            //textElm.setAttribute("style","font-family='" + font+"';font-size:" + fontSize +"px")
            curLineWidth = textElm.width;
            if (curLineWidth > tf.width) {
                if (curLetter != " ") {
                    for (let j = curLine.length - 1; j > 1; j--) {
                        if (curLine.substr(j, 1) != " ") {
                            i--;
                        }
                        else {
                            curLine = curLine.substr(0, j);
                            i--;
                            break;
                        }
                    }
                }
                results = results + curLine + "\n";
                curLine = "";
            }
            else {
                curLine += curLetter;
            }
        }
        results = results + curLine;
        //})
        textElm.remove();
        return results;
      }
      function shuffleLine(theLine, theShuffleChar) {
        //alert (theLine);
        //alert (theShuffleChar);
        let theResult = "";
        let theShuffleLoc = theLine.indexOf(theShuffleChar);
        let theLineLength = theLine.length;
        if (theShuffleLoc >= 0) {
            for (let j = theShuffleLoc + 1; j < theLineLength - 1; j++) {
                theResult = theResult + theLine.charAt(j);
            }
            // theResult=shuffleLine (theResult, theShuffleChar);  // For recursive flips
            theResult = theResult + theLine.charAt(theShuffleLoc);
            for (let k = 0; k < theShuffleLoc; k++) {
                theResult = theResult + theLine.charAt(k);
            }
            theResult = theResult + theLine.charAt(theLineLength - 1);
            return (theResult);
        }
        else {
            return (theLine);
        }
      }
      function reverseIt(val, wrap) {
        if (wrap) {
            val = wrapLines(val);
        }
        let theLineChars = "\r\n";
        let theStraightChars = "";
        let theFlipChars = "~"; // Characters that cause reversal of two sides of the line: "abc | def" -> " def|abc "
        //	if (this.form1.Numbers.checked)
        theStraightChars = "0123456789" + theStraightChars;
        //	if (this.form1.Dashes.checked)
        theStraightChars = "./:-" + theStraightChars;
        //	if (this.form1.English.checked)
        theStraightChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" + theStraightChars;
        //	if (this.form1.Newline.checked)
        let theShuffleChar = "~";
        let theString = val; //+ "\r\n";
        let theReverse = "";
        let theReverseArea = "";
        let theStraightBuffer = "";
        let theLength = theString.length;
        for (let i = 0; i < theLength; i++) {
            if (theLineChars.indexOf(theString.charAt(i)) >= 0) {
                // EOL
                if (theStraightBuffer != "") {
                    theReverse = theStraightBuffer + theReverse;
                    theStraightBuffer = "";
                }
                if (theString.charAt(i) == "\n") {
                    //	if (this.form1.Newline.checked) {
                    //	alert (theReverse);
                    theReverse = shuffleLine(theReverse, theShuffleChar);
                    //	} else {
                    //	theReverse=shuffleLine(theReverse, "\n");
                    //	}
                }
                theReverse = theReverse + theString.charAt(i);
            }
            else {
                if (theStraightChars.indexOf(theString.charAt(i)) >= 0) {
                    theStraightBuffer = theStraightBuffer + theString.charAt(i);
                }
                else {
                    if (theStraightBuffer != "") {
                        theReverse = theStraightBuffer + theReverse;
                        theStraightBuffer = "";
                    }
                    theReverse = theString.charAt(i) + theReverse;
                }
            }
            if (theString.charAt(i) == "\n") {
                theReverseArea = theReverseArea + theReverse;
                theReverse = "";
            }
        }
        if (theStraightBuffer != "") {
            theReverse = theStraightBuffer + theReverse;
            theStraightBuffer = "";
        }
        theReverseArea = theReverseArea + theReverse;
        return theReverseArea;
      }
      function copyTextToClipboard(text) {
        
        //Create a textbox field where we can insert text to. 
        var copyFrom = document.createElement("textarea");
      
        //Set the text content to be the text you wished to copy.
        copyFrom.textContent = text;
      
        //Append the textbox field into the body as a child. 
        //"execCommand()" only works when there exists selected text, and the text is inside 
        //document.body (meaning the text is part of a valid rendered HTML element).
        document.body.appendChild(copyFrom);
      
        //Select all the text!
        copyFrom.select();
      
        //Execute command
        document.execCommand('copy');
      
        //(Optional) De-select the text using blur(). 
        copyFrom.blur();
      
        //Remove the textbox field from the document.body, so no other JavaScript nor 
        //other elements can get access to this.
        document.body.removeChild(copyFrom);
      }