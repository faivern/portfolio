export const projectPath = "/projects/crate-ctf-2026";

export const writeUps = [
  {
    slug: "owls-and-dragons",
    title: "Owls and Dragons I & II",
    category: "Digital Forensics",
    techniques: "PNG metadata, file reconstruction, XOR, Base64, steganography",
    summary: "Two linked challenges trace hidden data from PNG metadata through an SVG, a JPEG letter grid, an archive and a PDF.",
    sections: [
      {
        title: "Part I — Recovering the hidden SVG",
        body: "The starting file, owl_king.png, contains compressed text in its zTXt chunks. The text holds indexed fragments of an SVG. Decompressing the chunks and sorting the fragments by index reconstructs the document. The SVG closing tag marks a useful boundary: separating the bytes that follow it leaves a viewable SVG and preserves the extra data for analysis.",
      },
      {
        title: "Part II — Following the embedded data",
        body: "Applying XOR with the byte 0x13 to the trailing data reveals a JPEG letter grid. Separately, the SVG contains Base64-encoded data that leads to a disguised 7z archive and an image with an embedded PDF. A clue in the PDF unlocks the archive. The image inside the archive and the JPEG letter grid together reveal another passphrase, which is used in the final steganographic extraction to recover an image containing the flag.",
      },
      {
        title: "Takeaway",
        body: "File headers, metadata and closing markers help identify where one artifact ends and the next begins. Keeping the JPEG and the reconstructed SVG available matters because the two branches of the investigation come together near the end.",
      },
    ],
  },
  {
    slug: "dolt-budskap",
    title: "Dolt Budskap — Hidden Message",
    category: "Digital Forensics",
    techniques: "File carving, spectrogram analysis, Binwalk, Audacity, ZIP utilities",
    summary: "An MP3 contains a password-protected ZIP archive. Its spectrogram supplies the password.",
    sections: [
      {
        title: "Finding the archive",
        body: "A file signature scan with Binwalk identifies a ZIP archive embedded in the MP3. The archive can be carved out of the audio file, but its contents require a password.",
      },
      {
        title: "Reading the spectrogram",
        body: "Audacity’s spectrogram displays frequency over time, with intensity indicating how much energy is present. In that view, a visible pattern spells out the password. Opening the carved ZIP with that password recovers the flag.",
      },
      {
        title: "Takeaway",
        body: "The file structure and the audio signal each contain part of the solution. A signature scan finds the archive, while a different view of the recording provides the clue that opens it.",
      },
    ],
  },
  {
    slug: "tidpunkt",
    title: "Tidpunkt — OSINT Geolocation Investigation",
    category: "Open-Source Intelligence",
    techniques: "Geolocation, image analysis, metadata, sun position",
    summary: "Construction clues, public records and sunlight place a photograph in Linköping and narrow its capture time.",
    sections: [
      {
        title: "Identifying the location",
        body: "The photograph shows buildings, commercial properties and construction fencing. The fencing helps narrow the search to Östergötland. Public information about local construction connects Stångåstaden and PEAB to work in the Djurgården area of Linköping, where the surroundings can be checked against the photograph.",
      },
      {
        title: "Estimating the capture time",
        body: "The image metadata supplies the date. With the date and location established, the visible lighting can be compared with the expected position of the sun. The challenge solution places the photograph around midday.",
      },
      {
        title: "Takeaway",
        body: "The location and time estimates rely on different clues. Public construction information helps establish where to look, and the date and lighting together support an approximate time window.",
      },
    ],
  },
];
