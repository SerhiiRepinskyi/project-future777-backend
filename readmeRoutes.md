### endpoints for protected routes

app.use("/api/boards", boardsRouter);
app.use("/api/columns", columnsRouter);
app.use("/api/cards", cardsRouter);


## routes for "/api/boards" endpoint

# get all columns/cards with optional filter by priority (ДОДАНО 2023-09-02)
router.get(/:id/columns, boardsController.getContent);
router.get(/:id/columns?priority=2, boardsController.getContent);

# get list of boards
router.get("/", boardsController.getAll);

# get board by id
router.get("/:id", boardsController.getById);

# delete board by id
router.delete("/:id", boardsController.deleteById);

# add board
//TODO: UPDATED! to allow iconId and backgroundURL fields
router.post("/", boardsController.add);

# update board by id (NB! except columns list)
router.patch("/:id",	boardsController.updateById);

# update board by id - only columns list) // for drag-n-drop
router.patch("/:id/columns",	boardsController.updateColumns);

# add column
router.post("/:id/columns",	boardsController.addColumn);


### routes for "/api/columns" endpoint

# get all cards for column with id
router.get(/:id/cards, columnsController.getAllCards);
# get all cards for column(filtered by priority) NEW!
router.get(/:id/cards?f=2, columnsController.getAllCards);

# get column with id
router.get(/:id, columnsController.getColumnById);

# update column
router.patch("/:id", columnsController.updateColumn);

# delete column
router.delete("/:id", columnsController.deleteById);

# add card
router.post("/:id/cards", boardsController.addCard);


### routes for "/api/cards" endpoint

# get card by id
router.get(/:id, cardsController.getCardById);

#  update card
router.put("/:id", cardsController.updateCard);

# delete card
router.delete("/:id", cardsController.deleteById);

# move card
router.patch("/:id", cardsController.moveCard);
