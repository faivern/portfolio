import type { CaseStudy } from "./types";

export const fraExfiltratoren: CaseStudy = {
  context: "FRA CTF · Network forensics · 3 of 7 flags documented",
  sources: [
    {
      title: "FRA — official challenge",
      url: "https://challenge.fra.se/",
      detail:
        "Challenge scenario and download. FRA lists seven flags in Exfiltratören; this write-up documents three.",
    },
  ],
  sections: [
    {
      id: "objective",
      title: "Objective",
      blocks: [
        {
          type: "paragraph",
          text: "In FRA’s fictional scenario, a space-industry company suspects an employee of leaking information to someone planning a break-in. I investigated the supplied network capture to identify what had left the network and recover the concealed messages.",
        },
        {
          type: "paragraph",
          text: "My notes document three recovered flags across FTP, email, and a custom UDP transfer. The work combines protocol inspection in Wireshark, Base45 decoding in Python, CyberChef transformations, and image-metadata inspection with ExifTool. This is a partial solution to the seven-flag challenge.",
        },
        {
          type: "table",
          caption: "Documented findings at a glance",
          headers: ["Evidence trail", "Recovered information"],
          rows: [
            ["FTP → msg.txt → Base64", "flagga{functional_treshold_power}"],
            ["SMTP → PDF → QR → Base45 → PNG", "Door code 1632 and flagga{qrazy_basy}"],
            ["UDP → reconstructed PNG → metadata → Base64", "A message about three gates and flagga{play_the_5_tones}"],
          ],
        },
      ],
    },
    {
      id: "flag-1",
      title: "Flag 1 — FTP",
      blocks: [
        {
          type: "paragraph",
          text: "The FTP control conversation exposes a STOR msg.txt command: a file upload worth following. The key detail is the PORT command, because FTP carries commands and file contents on separate connections. Reading the control stream alone would miss the message.",
        },
        {
          type: "images",
          images: [{
            src: "/projects/FRA-Exfiltratoren/ftp-control.png",
            width: 1488, height: 750,
            alt: "Wireshark packet list with PORT 10,0,0,10,160,249 and STOR msg.txt in the FTP control traffic",
            caption: "The upload command identifies the file; PORT identifies where to look for its contents.",
          }],
        },
        {
          type: "code", language: "text",
          caption: "Deriving the active-mode FTP data port from the captured command",
          code: "PORT 10,0,0,10,160,249\n160 × 256 + 249 = 41209\n\nWireshark display filter:\ntcp.port == 41209",
        },
        {
          type: "paragraph",
          text: "Filtering on port 41209 and following the TCP stream exposes a short Swedish message about switching to disguised communication, followed by an encoded line.",
        },
        {
          type: "images",
          images: [{
            src: "/projects/FRA-Exfiltratoren/ftp-message.png",
            width: 628, height: 110,
            alt: "FTP data stream containing a Swedish message and the Base64 string from msg.txt",
            caption: "The file contents, recovered from the data connection rather than the control conversation.",
          }],
        },
        {
          type: "paragraph",
          text: "I entered the encoded line into dCode’s Cipher Identifier to identify a likely encoding. Base64 Coding was its top suggestion, giving me a concrete transformation to try next.",
        },
        {
          type: "images",
          images: [{
            src: "/projects/FRA-Exfiltratoren/ftp-dcode.png",
            width: 1424, height: 633,
            alt: "dCode Cipher Identifier analysing the encoded FTP message and ranking Base64 Coding as its top suggestion",
            caption: "dCode suggests Base64 as the most likely encoding for the message.",
          }],
        },
        {
          type: "paragraph",
          text: "I then pasted the same string into CyberChef and applied From Base64. The output reads flagga{functional_treshold_power}, confirming the suggested encoding and revealing the first flag. Base64 is an encoding rather than encryption, so this step decodes the text without a decryption key.",
        },
        {
          type: "images",
          images: [{
            src: "/projects/FRA-Exfiltratoren/ftp-cyberchef.png",
            width: 1405, height: 782,
            alt: "CyberChef From Base64 recipe decoding the FTP message into flagga{functional_treshold_power}",
            caption: "CyberChef decodes the Base64 string into the first flag.",
          }],
        },
      ],
    },
    {
      id: "flag-2",
      title: "Flag 2 — Email & QR payload",
      blocks: [
        {
          type: "paragraph",
          text: "The protocol hierarchy also shows SMTP traffic. Following that conversation reveals an email with a MIME attachment named presentkort.pdf and Content-Transfer-Encoding: base64. These headers identify a recoverable document inside the message.",
        },
        {
          type: "images",
          images: [{
            src: "/projects/FRA-Exfiltratoren/smtp-attachment.png",
            width: 583, height: 830,
            alt: "SMTP stream showing MIME headers identifying presentkort.pdf as a Base64-encoded PDF attachment",
            caption: "The attachment headers provide the filename, media type, and transfer encoding.",
          }],
        },
        {
          type: "paragraph",
          text: "I used Wireshark’s Export Objects → IMF to save the email, then opened its PDF attachment. The document looks like a coffee gift card, but its QR code supplies the next layer of data to investigate.",
        },
        {
          type: "images",
          images: [{
            src: "/projects/FRA-Exfiltratoren/gift-card.png",
            width: 2048, height: 1023,
            alt: "Recovered presentkort.pdf showing a Swedish coffee gift card with a QR code",
            caption: "The recovered attachment contains the QR code used in the next decoding step.",
          }],
        },
        {
          type: "paragraph",
          text: "I saved the QR payload in qr.txt and decoded it with Python’s base45 package. Before treating the output as an image, the script printed its first eight bytes. The resulting PNG signature gave a concrete check that the decoded bytes had the expected file format.",
        },
        {
          type: "code", language: "text",
          caption: "Python decoding script transcribed from my notes; requires the base45 package",
          code: 'from pathlib import Path\nimport base45\n\nencoded = Path("qr.txt").read_text(\n    encoding="utf-8"\n).strip("\\r\\n")\ndecoded = base45.b45decode(encoded)\n\nprint("File header:", decoded[:8].hex(" "))\nPath("decoded.png").write_bytes(decoded)',
        },
        {
          type: "images",
          images: [{
            src: "/projects/FRA-Exfiltratoren/png-signature.png",
            width: 331, height: 61,
            alt: "Terminal output from decode.py showing PNG signature 89 50 4e 47 0d 0a 1a 0a",
            caption: "The decoded bytes begin with the PNG signature.",
          }],
        },
        {
          type: "paragraph",
          text: "Opening decoded.png reveals a door code, 1632, alongside flagga{qrazy_basy}. The sequence connects the result back to the capture: an email attachment contains a QR code whose Base45 payload is itself an image.",
        },
        {
          type: "images",
          images: [{
            src: "/projects/FRA-Exfiltratoren/qr-result.png",
            width: 1375, height: 904,
            alt: "Decoded PNG displaying Portkod: 1632 and flagga{qrazy_basy}",
            caption: "The recovered image supplies both a flag and information relevant to the fictional break-in.",
          }],
        },
      ],
    },
    {
      id: "flag-3",
      title: "Flag 3 — UDP & image metadata",
      blocks: [
        {
          type: "paragraph",
          text: "The UDP conversations expose a custom JSON-based transfer. Its opening message announces top_secret.png, an expected size of 2,662,470 bytes, and an MD5 value. That is useful validation information: a readable image alone would not establish that every byte had been reconstructed correctly.",
        },
        {
          type: "images",
          images: [{
            src: "/projects/FRA-Exfiltratoren/udp-announcement.png",
            width: 724, height: 418,
            alt: "Wireshark UDP stream announcing top_secret.png with its expected size and MD5 checksum",
            caption: "The sender declares the target file and values against which a reconstruction can be checked.",
          }],
        },
        {
          type: "paragraph",
          text: "The response supplies a transfer ID, a key, and port 31337. Subsequent messages contain indexed chunks and acknowledgements with a chk field; the data stream carries hex-encoded content. These fields matter because packet order alone is not enough to reconstruct a UDP transfer, and the capture includes a negative acknowledgement.",
        },
        {
          type: "images",
          images: [{
            src: "/projects/FRA-Exfiltratoren/udp-control.png",
            width: 734, height: 428,
            alt: "UDP control stream with transfer ID 3752494453, a key, port 31337, and indexed chunk acknowledgements including chk false",
            caption: "Control messages expose the transfer parameters and chunk checks.",
          }],
        },
        {
          type: "paragraph",
          text: "First, order the data-bearing chunks by ix. Exclude the rejected chunk identified by chk: false, then combine the remaining data values in index order. This reconstructs a hex representation of the transferred bytes.",
        },
        {
          type: "images",
          images: [{
            src: "/projects/FRA-Exfiltratoren/reference-sorted-chunks.png",
            width: 783, height: 713,
            alt: "Sorted JSON chunks showing ix 0 followed by ix 4045 and their hex-encoded data fields",
            caption: "Step 1: ordered chunks before extracting their data fields.",
          }],
        },
        {
          type: "paragraph",
          text: "Next, use From Hex in CyberChef, then RC4 with the transfer key interpreted as hexadecimal. Hex decoding alone does not yield the expected PNG; RC4 produces output beginning with its file signature.",
        },
        {
          type: "code", language: "text",
          caption: "Reconstruction recipe — key from the captured transfer response",
          code: "Ordered chunk data → From Hex → RC4\nKey: 425c7548030e56735ef1c01c9182ec1f\nKey format: HEX\nSave the decrypted bytes as top_secret.png",
        },
        {
          type: "images",
          images: [{
            src: "/projects/FRA-Exfiltratoren/reference-rc4.png",
            width: 1521, height: 640,
            alt: "CyberChef recipe applying From Hex and RC4, with PNG visible at the start of the output",
            caption: "Step 2: RC4 reveals the PNG signature.",
          }],
        },
        {
          type: "paragraph",
          text: "Finally, compare the decrypted file with the announced size and checksum. The MD5 output shown below matches the advertised value.",
        },
        {
          type: "images",
          images: [{
            src: "/projects/FRA-Exfiltratoren/reference-md5.png",
            width: 910, height: 395,
            alt: "CyberChef MD5 result showing 4fccf21ce07bdce70e1030081b9ae705 after RC4 decryption",
            caption: "Step 3: MD5 verification of the decrypted output.",
          }],
        },
        {
          type: "paragraph",
          text: "ExifTool identifies the reconstructed file as a 1024 × 1024 PNG and exposes a User Comment containing encoded text. Inspecting metadata extends the investigation beyond the visible pixels: a recovered image can carry a separate message in its descriptive fields.",
        },
        {
          type: "images",
          images: [{
            src: "/projects/FRA-Exfiltratoren/png-metadata.png",
            width: 1180, height: 590,
            alt: "ExifTool output for top_secret_reconstructed.png showing PNG properties and an encoded User Comment",
            caption: "The User Comment is the next evidence-bearing field.",
          }],
        },
        {
          type: "paragraph",
          text: "Decoding that comment from Base64 in CyberChef reveals a Swedish message about three gates, followed by flagga{play_the_5_tones}. This is the third flag documented in my analysis.",
        },
        {
          type: "images",
          images: [{
            src: "/projects/FRA-Exfiltratoren/metadata-result.png",
            width: 1544, height: 698,
            alt: "CyberChef From Base64 output showing a message about three gates and flagga{play_the_5_tones}",
            caption: "Base64 decoding turns the image comment into readable text and the third documented flag.",
          }],
        },
      ],
    },
    {
      id: "takeaways",
      title: "Takeaways",
      blocks: [
        {
          type: "paragraph",
          text: "The central lesson is to follow the structure of the traffic: FTP control commands point to a separate data connection, MIME headers identify an attachment, and a custom transfer exposes its own indexing and validation fields. Each recovered artifact becomes evidence for the next step.",
        },
        {
          type: "paragraph",
          text: "The UDP transfer highlights the value of checking each transformation: chunk indices establish order, the PNG signature identifies the decrypted format, and the checksum checks the reconstructed bytes. Metadata inspection then reveals information beyond the visible image.",
        },
      ],
    },
  ],
};
