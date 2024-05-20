class QrCodeGenerator {
    static _getLength(value) {
        return value.length;
    }

    static _toHex(value) {
        console.log('test1', value.toString(16).padStart(2, '0'));
        return value.toString(16).padStart(2, '0');
    }

    static _toStringQr(tag, value, length) {
        const hexTag = QrCodeGenerator._toHex(tag);
        const hexLength = QrCodeGenerator._toHex(length);
        console.log('test' ,hexTag + hexLength + value);
        return hexTag + hexLength + value;
    }

    static _getTLV(dataToEncode) {
        let TLVS = '';
        for (let i = 0; i < dataToEncode.length; i++) {
            const tag = dataToEncode[i][0];
            const value = dataToEncode[i][1];
            const length = QrCodeGenerator._getLength(value);
            TLVS += QrCodeGenerator._toStringQr(tag, value, length);
            console.log('tag' ,tag);
            console.log('value' ,value);
            console.log('length' ,length);
        }
        console.log('TLVS' ,TLVS);
        return TLVS;
    }

    static getTlvString(invoice) {
        const dataToEncode = [
            [1, invoice.client.name],
            [2, invoice.client.tax_number],
            [3, invoice.created_at],
            [4, invoice.totalPrice.toString()],
            [5, invoice.taxPrice.toString()]
        ];
        console.log('dataToEncode' ,dataToEncode);
        const TLV = QrCodeGenerator._getTLV(dataToEncode);
        const QR = btoa(TLV);  // Encode TLV string to base64
        console.log('QR' , QR);
        return QR;
    }
}

// Example usage:
const invoice = {
    client: {
        name: "John Doe",
        tax_number: "12345678936495"
    },
    created_at: "2023-05-20",
    totalPrice: 100.50,
    taxPrice: 15.75
};

const qrCodeString = QrCodeGenerator.getTlvString(invoice);
console.log(qrCodeString);




let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");


function genrateQr() {
    qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrCodeString;
    // imgBox.classList.add("show-img")
}