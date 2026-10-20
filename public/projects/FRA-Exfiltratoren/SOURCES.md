# Evidence provenance

The PNGs in the table below were extracted from the author's supplied `exfiltratören.pdf`.
Embedded images were extracted at their original dimensions without pixel edits.

| Asset | PDF page | Embedded image xref |
| --- | --- | --- |
| ftp-control.png | 1 | 5 |
| ftp-message.png | 3 | 14 |
| smtp-attachment.png | 5 | 21 |
| gift-card.png | 7 | 29 |
| png-signature.png | 8 | 36 |
| qr-result.png | 8 | 37 |
| udp-announcement.png | 9 | 43 |
| udp-control.png | 10 | 46 |
| png-metadata.png | 12 | 54 |
| metadata-result.png | 12 | 55 |

The Python snippet is transcribed from page 8. The PDF records three flag
results, but does not contain a complete UDP reconstruction script or a
verified MD5 comparison. No original PCAP was supplied with these notes.

FRA's official scenario and seven-flag total: https://challenge.fra.se/

Additional screenshots supplied by the author, copied without pixel edits:

- `ftp-dcode.png`: workspace `dcode.png`, 1424 × 633; encoding identification.
- `ftp-cyberchef.png`: workspace `cyberchef.png`, 1405 × 782; Base64 decoding of Flag 1.

Tools listed in the portfolio: CyberChef, Wireshark, Python 3, and dCode.

## Borrowed reconstruction evidence

Author: Ramages. Article: Fra Exfiltratoren, published November 1, 2025.
Source: https://mrskeltal.com/posts/FRA-exfiltratoren/#flag-4
License stated on article: CC BY 4.0,
https://creativecommons.org/licenses/by/4.0/

The following screenshots are reproduced without changes and served locally:

| Local file | Original image URL |
| --- | --- |
| reference-sorted-chunks.png | https://mrskeltal.com/assets/images/FRA/exfiltratoren/flag4_sorteddata.png |
| reference-rc4.png | https://mrskeltal.com/assets/images/FRA/exfiltratoren/flag4_rc4decode.png |
| reference-md5.png | https://mrskeltal.com/assets/images/FRA/exfiltratoren/flag4_md5verify.png |

The accompanying reconstruction explanation is paraphrased from the article's
Flag 4 section (Flag 3 in this portfolio). This material was added after the
original solve to explain missing documentation. The reference's MD5 result is
attributed to Ramages, not claimed as a new verification by the portfolio author.
