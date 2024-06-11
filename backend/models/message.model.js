import mongoose from "mongoose";
import crypto from "crypto";
import CryptoJS from "crypto-js";
import { performance } from "perf_hooks";

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
function generate3DESSecretKey() {
  // 24 octeți = 192 biți
  const buffer = crypto.randomBytes(24);
  return buffer;
}

// Funcție pentru măsurarea memoriei
function measureMemoryUsage() {
  const used = process.memoryUsage();
  console.log(
    `🧠  Memorie fizică [resident set size (RSS)]: ${(
      used.rss /
      1024 /
      1024
    ).toFixed(2)} MB`
  );
  console.log(
    `🧠  Memorie totală alocată pentru heap: ${(
      used.heapTotal /
      1024 /
      1024
    ).toFixed(2)} MB`
  );
  console.log(
    `🧠  Memorie utilizată din heap: ${(used.heapUsed / 1024 / 1024).toFixed(
      2
    )} MB`
  );
}

// Metoda de criptare
messageSchema.methods.encryptMessage = function () {
  // Măsurare timpul de generare a cheii
  const startTimeGenerateKey = performance.now();
  const secretKeyBuffer = generate3DESSecretKey();
  const secretKeyHex = secretKeyBuffer.toString("hex");
  const secretKey = CryptoJS.enc.Hex.parse(secretKeyHex);
  const endTimeGenerateKey = performance.now();
  const timeGenerateKey = (endTimeGenerateKey - startTimeGenerateKey).toFixed(
    2
  );
  const iv = CryptoJS.lib.WordArray.random(8);
  console.log(
    "____________________________________________________________________________________________________________________________________________________________________"
  );
  console.log("🔒  Triple Data Encryption Standard 192 [3DES-192]  🔒");
  console.log("");
  console.log("");
  // Măsurare resurse înainte de criptare
  console.log("📊  Măsurare resurse înainte de criptare  🔒");
  measureMemoryUsage();
  console.log("");
  if (this.message) {
    // Măsurare lungimea mesajului original (numărul de caractere)
    const originalMessageLength = this.message.length;
    // Măsurare dimensiunea mesajului original (numărul de bytes)
    const originalSize = Buffer.byteLength(this.message, "utf8");
    const encrypted = CryptoJS.TripleDES.encrypt(
      CryptoJS.enc.Utf8.parse(this.message),
      secretKey,
      { iv: iv }
    );
    this.message = encrypted.toString();
    // Măsurare lungimea mesajului criptat (numărul de caractere)
    const encryptedMessageLength = this.message.length;
    this.encryptionKey = secretKeyHex;
    // Salvează IV-ul
    this.iv = iv.toString();
    // Calculare lungimea cheii în biți
    const keyLengthBits = secretKeyBuffer.length * 8; // fiecare octet are 8 biți
    console.log("🔑  Cheia de criptare: ", this.encryptionKey);
    console.log(
      "📐  Dimensiunea cheii de criptare: " + keyLengthBits + " biți"
    );
    console.log(
      "⏱️  Timpul necesar pentru generarea cheii de criptare: " +
        timeGenerateKey +
        " ms"
    );
    console.log("");
    console.log(
      "📏  Lungimea mesajului original: " + originalMessageLength + " caractere"
    );
    console.log(
      "📐  Dimensiunea mesajului original: " + originalSize + " bytes"
    );
    console.log("");
    // console.log("🔒  Mesajul criptat: ", this.message);
    console.log(
      "📏  Lungimea mesajului criptat: " + encryptedMessageLength + " caractere"
    );
    console.log("");
    // Măsurare resurse după criptare
    console.log("📊  Măsurare resurse după criptare  🔒");
    measureMemoryUsage();
    console.log("");
  }
};

// Metoda de decriptare
messageSchema.methods.decryptMessage = function () {
  if (this.message && this.encryptionKey && this.iv) {
    // Măsurare resurse înainte de decriptare
    console.log("📊  Măsurare resurse înainte de decriptare  🔓");
    measureMemoryUsage();
    console.log("");
    const decrypted = CryptoJS.TripleDES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(this.message) },
      CryptoJS.enc.Hex.parse(this.encryptionKey),
      { iv: CryptoJS.enc.Hex.parse(this.iv) } // Folosește IV-ul stocat
    );
    this.message = decrypted.toString(CryptoJS.enc.Utf8);
    const decryptedMessageLength = this.message.length;
    // Măsurare resurse după decriptare
    console.log("📊  Măsurare resurse după decriptare  🔓");
    measureMemoryUsage();
    console.log("");
    console.log(
      "📏  Lungimea mesajului decriptat: " +
        decryptedMessageLength +
        " caractere"
    );
    console.log("");
  }
};

const Message = mongoose.model("Message", messageSchema);

export default Message;
