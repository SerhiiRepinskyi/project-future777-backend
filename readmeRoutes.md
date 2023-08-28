### endpoints for protected routes

app.use("/api/boards", boardsRouter);
app.use("/api/columns", columnsRouter);
app.use("/api/cards", cardsRouter);


## routes for "/api/boards" endpoint

# get list of boards
router.get("/", boardsController.getAll);

# get boards by id
router.get("/:id", boardsController.getById);

# delete board by id
router.delete("/:id", boardsController.deleteById);

# add board
router.post("/", boardsController.add);

# update board by id (NB! except columns list)
router.patch("/:id",	boardsController.updateById);

# update board by id - only columns list) // for drag-n-drop
router.patch("/:id/columns",	boardsController.updateColumns);

# add column
router.post("/:id/columns",	boardsController.addColumn);


### routes for "/api/columns" endpoint

# update column
router.patch("/:id", columnsController.updateColumn);

# delete column
router.delete("/:id", columnsController.deleteById);

# add card
router.post("/:id/cards", boardsController.addCard);


### routes for "/api/cards" endpoint

#  update card
router.put("/:id", cardsController.updateCard);

# delete card
router.delete("/:id", cardsController.deleteById);

# move card
router.patch("/:id", cardsController.moveCard);
