$SecurePassword = ConvertTo-SecureString "<certificate_password>" -AsPlainText -Force

Import-PfxCertificate -FilePath "<new_folder>\<certificate_file>" -CertStoreLocation Cert:\CurrentUser\My\ -Password $SecurePassword 