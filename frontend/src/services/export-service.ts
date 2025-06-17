/**
 * Service d'export des données utilisateur
 * Gère l'export des données en différents formats (CSV, JSON, PDF, Print)
 * avec prise en compte des filtres et de la visibilité des colonnes
 */

import type { User } from "@/types/user"
import type { ExportOptions, ColumnConfig, ExportType, ExportResult } from "@/types/export"
import { formatDate } from "@/utils/date-utils"

/**
 * Configuration des colonnes disponibles pour l'export
 * Définit comment chaque colonne doit être exportée
 */
const COLUMN_CONFIGS: Record<string, ColumnConfig> = {
  nom: {
    key: "nom",
    header: "Nom complet",
    width: 30,
    formatter: (value, user) => `${user.nom} ${user.prenom}`,
  },
  email: {
    key: "email",
    header: "Email",
    width: 45,
  },
  role: {
    key: "role",
    header: "Rôle",
    width: 20,
  },
  filiere: {
    key: "filiere",
    header: "Filière",
    width: 25,
    formatter: (value) => value || "-",
  },
  niveauEtude: {
    key: "niveauEtude",
    header: "Niveau d'étude",
    width: 20,
    formatter: (value) => value || "-",
  },
  telephone: {
    key: "telephone",
    header: "Téléphone",
    width: 25,
    formatter: (value) => value || "-",
  },
  dateInscription: {
    key: "dateInscription",
    header: "Date d'inscription",
    width: 25,
    formatter: (value) => formatDate(new Date(value)),
  },
  isActif: {
    key: "statut",
    header: "Statut",
    width: 15,
    formatter: (value, user) => (user.isActif ? "Actif" : "Inactif"),
  },
  candidatures: {
    key: "candidaturesCount",
    header: "Candidatures",
    width: 15,
    formatter: (value, user) => (user.role === "Etudiant" ? user.candidatures.length.toString() : "-"),
  },
}

/**
 * Classe principale pour la gestion des exports
 */
export class ExportService {
  /**
   * Obtient les colonnes à exporter basées sur la visibilité
   */
  private static getExportColumns(visibleColumns: string[]): ColumnConfig[] {
    console.log("Colonnes visibles reçues:", visibleColumns)

    // Si aucune colonne spécifiée, utiliser toutes les colonnes par défaut
    if (!visibleColumns || visibleColumns.length === 0) {
      visibleColumns = [
        "nom",
        "email",
        "role",
        "filiere",
        "niveauEtude",
        "telephone",
        "dateInscription",
        "isActif",
        "candidatures",
      ]
    }

    const columns = visibleColumns.filter((col) => COLUMN_CONFIGS[col]).map((col) => COLUMN_CONFIGS[col])

    console.log(
      "Colonnes configurées pour export:",
      columns.map((c) => c.header),
    )
    return columns
  }

  /**
   * Formate une valeur selon la configuration de la colonne
   */
  private static formatValue(config: ColumnConfig, user: User): string {
    const rawValue =
      config.key === "statut"
        ? user.isActif
        : config.key === "candidaturesCount"
          ? user.candidatures.length
          : user[config.key as keyof User]

    const formatted = config.formatter ? config.formatter(rawValue, user) : String(rawValue || "")
    return formatted
  }

  /**
   * Échappe une valeur pour CSV
   */
  private static escapeCsvValue(value: string): string {
    // Convertir en string et nettoyer
    const cleanValue = String(value || "").trim()

    // Si la valeur contient des caractères spéciaux, l'encapsuler dans des guillemets
    if (
      cleanValue.includes(",") ||
      cleanValue.includes('"') ||
      cleanValue.includes("\n") ||
      cleanValue.includes("\r")
    ) {
      // Échapper les guillemets en les doublant
      return `"${cleanValue.replace(/"/g, '""')}"`
    }

    return cleanValue
  }

  /**
   * Export au format CSV avec encodage UTF-8 et BOM
   */
  static async exportToCSV(options: ExportOptions): Promise<ExportResult> {
    try {
      const { data, visibleColumns, filename = "utilisateurs" } = options
      console.log("Export CSV - Données:", data.length, "utilisateurs")
      console.log("Export CSV - Colonnes:", visibleColumns)

      const columns = this.getExportColumns(visibleColumns)

      if (columns.length === 0) {
        return { success: false, error: "Aucune colonne visible à exporter" }
      }

      // En-têtes CSV
      const headers = columns.map((col) => this.escapeCsvValue(col.header))
      console.log("En-têtes CSV:", headers)

      // Données CSV
      const rows = data.map((user, index) => {
        const row = columns.map((col) => {
          const value = this.formatValue(col, user)
          return this.escapeCsvValue(value)
        })

        if (index < 3) {
          // Log des 3 premières lignes pour debug
          console.log(`Ligne ${index + 1}:`, row)
        }

        return row
      })

      // Construction du contenu CSV avec séparateur point-virgule pour Excel français
      const csvContent = [headers.join(";"), ...rows.map((row) => row.join(";"))].join("\r\n")

      console.log("Contenu CSV (100 premiers caractères):", csvContent.substring(0, 100))

      // Création du blob avec BOM UTF-8
      const BOM = "\uFEFF"
      const blob = new Blob([BOM + csvContent], {
        type: "text/csv;charset=utf-8;",
      })

      // Téléchargement
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      return {
        success: true,
        message: `Export CSV réussi (${data.length} utilisateurs, ${columns.length} colonnes)`,
      }
    } catch (error) {
      console.error("Erreur export CSV:", error)
      return { success: false, error: `Échec de l'export CSV: ${error}` }
    }
  }

  /**
   * Export au format JSON structuré
   */
  static async exportToJSON(options: ExportOptions): Promise<ExportResult> {
    try {
      const { data, visibleColumns, filename = "utilisateurs" } = options
      console.log("Export JSON - Données:", data.length, "utilisateurs")

      const columns = this.getExportColumns(visibleColumns)

      if (columns.length === 0) {
        return { success: false, error: "Aucune colonne visible à exporter" }
      }

      // Création d'un objet JSON structuré avec métadonnées
      const exportData = {
        metadata: {
          exportDate: new Date().toISOString(),
          totalUsers: data.length,
          exportedColumns: columns.map((col) => col.header),
          filters: {
            appliedFilters: "Filtres de rôle et recherche appliqués",
            visibleColumns: visibleColumns,
          },
          version: "1.0",
        },
        users: data.map((user) => {
          const exportedUser: Record<string, any> = {}
          columns.forEach((col) => {
            exportedUser[col.header] = this.formatValue(col, user)
          })
          return exportedUser
        }),
      }

      const jsonContent = JSON.stringify(exportData, null, 2)
      const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" })

      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.json`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      return {
        success: true,
        message: `Export JSON réussi (${data.length} utilisateurs, ${columns.length} colonnes)`,
      }
    } catch (error) {
      console.error("Erreur export JSON:", error)
      return { success: false, error: "Échec de l'export JSON" }
    }
  }

  /**
   * Export au format PDF avec mise en page optimisée
   */
  static async exportToPDF(options: ExportOptions): Promise<ExportResult> {
    try {
      const { data, visibleColumns, filename = "utilisateurs-export.pdf", title = "Rapport des Utilisateurs" } = options
      console.log("Export PDF - Données:", data.length, "utilisateurs")

      const columns = this.getExportColumns(visibleColumns)

      if (columns.length === 0) {
        return { success: false, error: "Aucune colonne visible à exporter" }
      }

      // Import dynamique des bibliothèques PDF
      const [jsPDFModule, autoTableModule] = await Promise.all([import("jspdf"), import("jspdf-autotable")])

      const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default.jsPDF || jsPDFModule.default

      // Création du document PDF
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      })

      // En-tête du document
      doc.setFontSize(18)
      doc.text(title, 14, 22)

      // Métadonnées
      doc.setFontSize(10)
      doc.text(`Généré le: ${new Date().toLocaleDateString("fr-FR")}`, 14, 30)
      doc.text(`Total Utilisateurs: ${data.length}`, 14, 35)
      doc.text(`Colonnes exportées: ${columns.length}`, 14, 40)

      // Préparation des données pour le tableau
      const tableHeaders = columns.map((col) => col.header)
      const tableData = data.map((user) => columns.map((col) => this.formatValue(col, user)))

      // Configuration du tableau
      const tableConfig = {
        startY: 45,
        head: [tableHeaders],
        body: tableData,
        headStyles: {
          fillColor: [51, 51, 51],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        columnStyles: columns.reduce(
          (acc, col, index) => {
            acc[index] = { cellWidth: col.width || 20 }
            return acc
          },
          {} as Record<number, any>,
        ),
      }

      // Génération du tableau
      if (typeof doc.autoTable === "function") {
        doc.autoTable(tableConfig)
      } else if (autoTableModule.default && typeof autoTableModule.default === "function") {
        autoTableModule.default(doc, tableConfig)
      } else {
        throw new Error("AutoTable non disponible")
      }

      // Sauvegarde
      doc.save(filename)

      return {
        success: true,
        message: `Export PDF réussi (${data.length} utilisateurs, ${columns.length} colonnes)`,
      }
    } catch (error) {
      console.error("Erreur export PDF:", error)
      return { success: false, error: "Échec de l'export PDF" }
    }
  }

  /**
   * Impression des données
   */
  static async printUsers(options: ExportOptions): Promise<ExportResult> {
    try {
      const { data, visibleColumns, title = "Rapport des Utilisateurs" } = options
      const columns = this.getExportColumns(visibleColumns)

      if (columns.length === 0) {
        return { success: false, error: "Aucune colonne visible à imprimer" }
      }

      const printContent = `
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
              th { background-color: #f2f2f2; font-weight: bold; }
              .header { margin-bottom: 20px; }
              .metadata { font-size: 14px; color: #666; margin-bottom: 10px; }
              @media print {
                body { margin: 10px; }
                .header { page-break-inside: avoid; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${title}</h1>
              <div class="metadata">Généré le: ${new Date().toLocaleDateString("fr-FR")}</div>
              <div class="metadata">Total Utilisateurs: ${data.length}</div>
              <div class="metadata">Colonnes: ${columns.map((col) => col.header).join(", ")}</div>
            </div>
            <table>
              <thead>
                <tr>
                  ${columns.map((col) => `<th>${col.header}</th>`).join("")}
                </tr>
              </thead>
              <tbody>
                ${data
                  .map(
                    (user) => `
                  <tr>
                    ${columns.map((col) => `<td>${this.formatValue(col, user)}</td>`).join("")}
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
          </body>
        </html>
      `

      const printWindow = window.open("", "_blank")
      if (!printWindow) {
        return { success: false, error: "Impossible d'ouvrir la fenêtre d'impression" }
      }

      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()

      return {
        success: true,
        message: `Impression lancée (${data.length} utilisateurs, ${columns.length} colonnes)`,
      }
    } catch (error) {
      console.error("Erreur impression:", error)
      return { success: false, error: "Échec de l'impression" }
    }
  }

  /**
   * Point d'entrée principal pour tous les types d'export
   */
  static async export(type: ExportType, options: ExportOptions): Promise<ExportResult> {
    console.log(`Début export ${type}:`, {
      dataCount: options.data.length,
      visibleColumns: options.visibleColumns,
      filename: options.filename,
    })

    switch (type) {
      case "csv":
        return this.exportToCSV(options)
      case "json":
        return this.exportToJSON(options)
      case "pdf":
        return this.exportToPDF(options)
      case "print":
        return this.printUsers(options)
      default:
        return { success: false, error: `Type d'export non supporté: ${type}` }
    }
  }
}
