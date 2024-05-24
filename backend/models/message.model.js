import mongoose from "mongoose";
import crypto from "crypto";
import CryptoJS from "crypto-js";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    encryptionKey: {
      type: String,
      required: true,
    },
    iv: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Funcție pentru generarea unei noi chei de criptare
// Cheia secretă este generată cu o lungime de 24 de octeți (bytes), adică 192 de biți
// 3DES utilizează trei chei separate
// DES este extinsă cu 8 biți de paritate, rezultând 64 de biți pentru fiecare cheie DES (3 * 64 biți = 192 biți)
function generate3DESSecretKey() {
  const buffer = crypto.randomBytes(24);
  const hexKey = buffer.toString("hex");
  return CryptoJS.enc.Hex.parse(hexKey);
}

// Metode pentru criptare și decriptare ajustate pentru 3DES
messageSchema.methods.encryptMessage = function () {
  const secretKey = generate3DESSecretKey();
  const iv = CryptoJS.lib.WordArray.random(8);

  if (this.message) {
    const encrypted = CryptoJS.TripleDES.encrypt(
      CryptoJS.enc.Utf8.parse(this.message),
      secretKey,
      { iv: iv }
    );
    this.message = encrypted.toString();
    this.encryptionKey = secretKey.toString();
    this.iv = iv.toString(); // Salvează IV-ul
    console.log(
      "_________________________________________________________________________"
    );
    console.log("Cheia secretă este -> ", this.encryptionKey);
    console.log("Vectorul de inițializare IV este -> ", this.iv);
    console.log("Mesajul criptat este -> ", this.message);
  }
};

messageSchema.methods.decryptMessage = function () {
  if (this.message && this.encryptionKey && this.iv) {
    const decrypted = CryptoJS.TripleDES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(this.message) },
      CryptoJS.enc.Hex.parse(this.encryptionKey),
      { iv: CryptoJS.enc.Hex.parse(this.iv) } // Folosește IV-ul stocat
    );
    this.message = decrypted.toString(CryptoJS.enc.Utf8);
  }
};

const Message = mongoose.model("Message", messageSchema);

export default Message;
