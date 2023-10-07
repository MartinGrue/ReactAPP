Cypress.Commands.add("visualSnapshot", (maybeName) => {
    // @ts-ignore
    let snapshotTitle = cy.state("runnable").fullTitle();
    if (maybeName) {
      snapshotTitle = snapshotTitle + " - " + maybeName;
    }
    cy.percySnapshot(snapshotTitle, {
      // @ts-ignore
      widths: [cy.state("viewportWidth")],
      // @ts-ignore
      minHeight: cy.state("viewportHeight"),
    });
  });
  