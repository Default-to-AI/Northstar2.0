import {
    lc as R,
    mc as x,
    nc as A,
    pc as k,
    qc as G,
    rc as I,
    sc as L
} from "./chunk-NO4XYT7V.js";
import {
    Cb as S,
    Db as H,
    Ka as M,
    La as P,
    Na as E,
    Rc as T,
    pa as m,
    pb as n,
    qa as b,
    qb as h,
    sd as e,
    ta as O,
    ua as F,
    wb as c,
    yb as f
} from "./chunk-7LZCJGQ2.js";
var z = (() => {
        let t = class t {
            constructor() {
                this.vcr = F(f)
            }
        };
        t.\u0275fac = function(i) {
            return new(i || t)
        }, t.\u0275cmp = S({
            type: t,
            selectors: [
                ["ag-component-container"]
            ],
            standalone: !1,
            decls: 0,
            vars: 0,
            template: function(i, r) {},
            encapsulation: 2
        });
        let o = t;
        return o
    })(),
    N = 16,
    v = 0;

function B(o) {
    let t = new Map;
    for (let d = 0; d < N; d++) {
        let s = o.createComponent(z);
        t.set(d, s), R(s.location.nativeElement)
    }
    return t
}
var _ = new Set(["doesFilterPass", "isFilterActive"]),
    W = (() => {
        let t = class t extends L {
            setViewContainerRef(s, i) {
                this.viewContainerRef = s, this.angularFrameworkOverrides = i
            }
            createWrapper(s) {
                let i = this.angularFrameworkOverrides,
                    r = this;
                r.compShards ? ? = B(this.viewContainerRef);
                class a extends D {
                    init(p) {
                        i.runInsideAngular(() => {
                            super.init(p), this._componentRef.changeDetectorRef.detectChanges()
                        })
                    }
                    createComponent() {
                        return r.createComponent(s)
                    }
                    hasMethod(p) {
                        return l.getFrameworkComponentInstance()[p] != null
                    }
                    callMethod(p, g) {
                        let w = this.getFrameworkComponentInstance(),
                            y = w[p];
                        return _.has(p) ? y.apply(w, g) : i.runInsideAngular(() => y.apply(w, g))
                    }
                    addMethod(p, g) {
                        l[p] = g
                    }
                }
                let l = new a;
                return l
            }
            createComponent(s) {
                return v = (v + 1) % N, this.compShards.get(v).instance.vcr.createComponent(s)
            }
        };
        t.\u0275fac = (() => {
            let s;
            return function(r) {
                return (s || (s = P(t)))(r || t)
            }
        })(), t.\u0275prov = m({
            token: t,
            factory: t.\u0275fac
        });
        let o = t;
        return o
    })(),
    D = class {
        init(t) {
            this._params = t, this._componentRef = this.createComponent(), this._agAwareComponent = this._componentRef.instance, this._frameworkComponentInstance = this._componentRef.instance, this._eGui = this._componentRef.location.nativeElement, R(this._eGui), this._agAwareComponent.agInit(this._params)
        }
        getGui() {
            return this._eGui
        }
        getRootElement() {
            return this._eGui.firstChild
        }
        destroy() {
            this._frameworkComponentInstance && typeof this._frameworkComponentInstance.destroy == "function" && this._frameworkComponentInstance.destroy(), this._componentRef ? .destroy()
        }
        getFrameworkComponentInstance() {
            return this._frameworkComponentInstance
        }
    },
    C = class {
        constructor(t) {
            this.frameworkOverrides = t, this.wrappedListeners = new Map, this.wrappedGlobalListeners = new Map
        }
        wrap(t, d) {
            let {
                frameworkOverrides: s,
                wrappedListeners: i
            } = this, r = d;
            if (s.shouldWrapOutgoing) {
                r = l => {
                    s.wrapOutgoing(() => d(l))
                };
                let a = i.get(t);
                a || (a = new Map, i.set(t, a)), a.set(d, r)
            }
            return r
        }
        wrapGlobal(t) {
            let {
                frameworkOverrides: d,
                wrappedGlobalListeners: s
            } = this, i = t;
            return d.shouldWrapOutgoing && (i = (r, a) => {
                d.wrapOutgoing(() => t(r, a))
            }, s.set(t, i)), i
        }
        unwrap(t, d) {
            let {
                wrappedListeners: s
            } = this, i = s.get(t);
            if (i) {
                let r = i.get(d);
                if (r) return i.delete(d), i.size === 0 && s.delete(t), r
            }
            return d
        }
        unwrapGlobal(t) {
            let {
                wrappedGlobalListeners: d
            } = this, s = d.get(t);
            return s ? (d.delete(t), s) : t
        }
    },
    V = (() => {
        let t = class t extends k {
            constructor(s) {
                super("angular"), this._ngZone = s, this.batchFrameworkComps = !0, this.isRunningWithinTestZone = !1, this.wrapIncoming = (i, r) => this.runOutside(i, r), this.wrapOutgoing = i => this.runInsideAngular(i), this.isRunningWithinTestZone = window ? .AG_GRID_UNDER_TEST ? ? !!window ? .Zone ? .AsyncTestZoneSpec, this._ngZone ? this.isRunningWithinTestZone ? this.runOutside = (i, r) => r === "resize-observer" || r === "popupPositioning" ? this._ngZone.runOutsideAngular(i) : i() : this.runOutside = i => this._ngZone.runOutsideAngular(i) : this.runOutside = i => i()
            }
            get shouldWrapOutgoing() {
                return this._ngZone && h.isInAngularZone()
            }
            createLocalEventListenerWrapper(s, i) {
                if (this.shouldWrapOutgoing) return s ? ? (i.setFrameworkOverrides(this), new C(this))
            }
            createGlobalEventListenerWrapper() {
                return new C(this)
            }
            isFrameworkComponent(s) {
                if (!s) return !1;
                let i = s.prototype;
                return i && "agInit" in i
            }
            runInsideAngular(s) {
                return !this._ngZone || h.isInAngularZone() ? s() : this._ngZone.run(s)
            }
            runOutsideAngular(s, i) {
                return this.runOutside(s, i)
            }
        };
        t.\u0275fac = function(i) {
            return new(i || t)(O(h))
        }, t.\u0275prov = m({
            token: t,
            factory: t.\u0275fac
        });
        let o = t;
        return o
    })(),
    ne = (() => {
        let t = class t {
            constructor(s, i, r, a) {
                this._viewContainerRef = i, this._angularFrameworkOverrides = r, this._frameworkCompWrapper = a, this._initialised = !1, this._destroyed = !1, this._holdEvents = !0, this._fullyReady = new Promise(l => {
                    this._resolveFullyReady = l
                }), this.statusBar = void 0, this.sideBar = void 0, this.suppressContextMenu = void 0, this.preventDefaultOnContextMenu = void 0, this.allowContextMenuWithControlKey = void 0, this.columnMenu = void 0, this.suppressMenuHide = void 0, this.enableBrowserTooltips = void 0, this.tooltipTrigger = void 0, this.tooltipShowDelay = void 0, this.tooltipHideDelay = void 0, this.tooltipMouseTrack = void 0, this.tooltipShowMode = void 0, this.tooltipInteraction = void 0, this.popupParent = void 0, this.copyHeadersToClipboard = void 0, this.copyGroupHeadersToClipboard = void 0, this.clipboardDelimiter = void 0, this.suppressCopyRowsToClipboard = void 0, this.suppressCopySingleCellRanges = void 0, this.suppressLastEmptyLineOnPaste = void 0, this.suppressClipboardPaste = void 0, this.suppressClipboardApi = void 0, this.suppressCutToClipboard = void 0, this.columnDefs = void 0, this.defaultColDef = void 0, this.defaultColGroupDef = void 0, this.columnTypes = void 0, this.dataTypeDefinitions = void 0, this.maintainColumnOrder = void 0, this.enableStrictPivotColumnOrder = void 0, this.suppressFieldDotNotation = void 0, this.headerHeight = void 0, this.groupHeaderHeight = void 0, this.floatingFiltersHeight = void 0, this.pivotHeaderHeight = void 0, this.pivotGroupHeaderHeight = void 0, this.allowDragFromColumnsToolPanel = void 0, this.suppressMovableColumns = void 0, this.suppressColumnMoveAnimation = void 0, this.suppressMoveWhenColumnDragging = void 0, this.suppressDragLeaveHidesColumns = void 0, this.suppressGroupChangesColumnVisibility = void 0, this.suppressMakeColumnVisibleAfterUnGroup = void 0, this.suppressRowGroupHidesColumns = void 0, this.colResizeDefault = void 0, this.suppressAutoSize = void 0, this.autoSizePadding = void 0, this.skipHeaderOnAutoSize = void 0, this.autoSizeStrategy = void 0, this.components = void 0, this.editType = void 0, this.singleClickEdit = void 0, this.suppressClickEdit = void 0, this.readOnlyEdit = void 0, this.stopEditingWhenCellsLoseFocus = void 0, this.enterNavigatesVertically = void 0, this.enterNavigatesVerticallyAfterEdit = void 0, this.enableCellEditingOnBackspace = void 0, this.undoRedoCellEditing = void 0, this.undoRedoCellEditingLimit = void 0, this.defaultCsvExportParams = void 0, this.suppressCsvExport = void 0, this.defaultExcelExportParams = void 0, this.suppressExcelExport = void 0, this.excelStyles = void 0, this.findSearchValue = void 0, this.findOptions = void 0, this.quickFilterText = void 0, this.cacheQuickFilter = void 0, this.includeHiddenColumnsInQuickFilter = void 0, this.quickFilterParser = void 0, this.quickFilterMatcher = void 0, this.applyQuickFilterBeforePivotOrAgg = void 0, this.excludeChildrenWhenTreeDataFiltering = void 0, this.enableAdvancedFilter = void 0, this.alwaysPassFilter = void 0, this.includeHiddenColumnsInAdvancedFilter = void 0, this.advancedFilterParent = void 0, this.advancedFilterBuilderParams = void 0, this.suppressAdvancedFilterEval = void 0, this.suppressSetFilterByDefault = void 0, this.enableCharts = void 0, this.chartThemes = void 0, this.customChartThemes = void 0, this.chartThemeOverrides = void 0, this.chartToolPanelsDef = void 0, this.chartMenuItems = void 0, this.loadingCellRenderer = void 0, this.loadingCellRendererParams = void 0, this.loadingCellRendererSelector = void 0, this.localeText = void 0, this.masterDetail = void 0, this.keepDetailRows = void 0, this.keepDetailRowsCount = void 0, this.detailCellRenderer = void 0, this.detailCellRendererParams = void 0, this.detailRowHeight = void 0, this.detailRowAutoHeight = void 0, this.context = void 0, this.alignedGrids = void 0, this.tabIndex = void 0, this.rowBuffer = void 0, this.valueCache = void 0, this.valueCacheNeverExpires = void 0, this.enableCellExpressions = void 0, this.suppressTouch = void 0, this.suppressFocusAfterRefresh = void 0, this.suppressBrowserResizeObserver = void 0, this.suppressPropertyNamesCheck = void 0, this.suppressChangeDetection = void 0, this.debug = void 0, this.loading = void 0, this.overlayLoadingTemplate = void 0, this.loadingOverlayComponent = void 0, this.loadingOverlayComponentParams = void 0, this.suppressLoadingOverlay = void 0, this.overlayNoRowsTemplate = void 0, this.noRowsOverlayComponent = void 0, this.noRowsOverlayComponentParams = void 0, this.suppressNoRowsOverlay = void 0, this.pagination = void 0, this.paginationPageSize = void 0, this.paginationPageSizeSelector = void 0, this.paginationAutoPageSize = void 0, this.paginateChildRows = void 0, this.suppressPaginationPanel = void 0, this.pivotMode = void 0, this.pivotPanelShow = void 0, this.pivotMaxGeneratedColumns = void 0, this.pivotDefaultExpanded = void 0, this.pivotColumnGroupTotals = void 0, this.pivotRowTotals = void 0, this.pivotSuppressAutoColumn = void 0, this.suppressExpandablePivotGroups = void 0, this.functionsReadOnly = void 0, this.aggFuncs = void 0, this.suppressAggFuncInHeader = void 0, this.alwaysAggregateAtRootLevel = void 0, this.aggregateOnlyChangedColumns = void 0, this.suppressAggFilteredOnly = void 0, this.removePivotHeaderRowWhenSingleValueColumn = void 0, this.animateRows = void 0, this.cellFlashDuration = void 0, this.cellFadeDuration = void 0, this.allowShowChangeAfterFilter = void 0, this.domLayout = void 0, this.ensureDomOrder = void 0, this.enableCellSpan = void 0, this.enableRtl = void 0, this.suppressColumnVirtualisation = void 0, this.suppressMaxRenderedRowRestriction = void 0, this.suppressRowVirtualisation = void 0, this.rowDragManaged = void 0, this.suppressRowDrag = void 0, this.suppressMoveWhenRowDragging = void 0, this.rowDragEntireRow = void 0, this.rowDragMultiRow = void 0, this.rowDragText = void 0, this.dragAndDropImageComponent = void 0, this.dragAndDropImageComponentParams = void 0, this.fullWidthCellRenderer = void 0, this.fullWidthCellRendererParams = void 0, this.embedFullWidthRows = void 0, this.groupDisplayType = void 0, this.groupDefaultExpanded = void 0, this.autoGroupColumnDef = void 0, this.groupMaintainOrder = void 0, this.groupSelectsChildren = void 0, this.groupLockGroupColumns = void 0, this.groupAggFiltering = void 0, this.groupTotalRow = void 0, this.grandTotalRow = void 0, this.suppressStickyTotalRow = void 0, this.groupSuppressBlankHeader = void 0, this.groupSelectsFiltered = void 0, this.showOpenedGroup = void 0, this.groupHideParentOfSingleChild = void 0, this.groupRemoveSingleChildren = void 0, this.groupRemoveLowestSingleChildren = void 0, this.groupHideOpenParents = void 0, this.groupAllowUnbalanced = void 0, this.rowGroupPanelShow = void 0, this.groupRowRenderer = void 0, this.groupRowRendererParams = void 0, this.treeData = void 0, this.treeDataChildrenField = void 0, this.treeDataParentIdField = void 0, this.rowGroupPanelSuppressSort = void 0, this.suppressGroupRowsSticky = void 0, this.pinnedTopRowData = void 0, this.pinnedBottomRowData = void 0, this.enableRowPinning = void 0, this.isRowPinnable = void 0, this.isRowPinned = void 0, this.rowModelType = void 0, this.rowData = void 0, this.asyncTransactionWaitMillis = void 0, this.suppressModelUpdateAfterUpdateTransaction = void 0, this.datasource = void 0, this.cacheOverflowSize = void 0, this.infiniteInitialRowCount = void 0, this.serverSideInitialRowCount = void 0, this.suppressServerSideFullWidthLoadingRow = void 0, this.cacheBlockSize = void 0, this.maxBlocksInCache = void 0, this.maxConcurrentDatasourceRequests = void 0, this.blockLoadDebounceMillis = void 0, this.purgeClosedRowNodes = void 0, this.serverSideDatasource = void 0, this.serverSideSortAllLevels = void 0, this.serverSideEnableClientSideSort = void 0, this.serverSideOnlyRefreshFilteredGroups = void 0, this.serverSidePivotResultFieldSeparator = void 0, this.viewportDatasource = void 0, this.viewportRowModelPageSize = void 0, this.viewportRowModelBufferSize = void 0, this.alwaysShowHorizontalScroll = void 0, this.alwaysShowVerticalScroll = void 0, this.debounceVerticalScrollbar = void 0, this.suppressHorizontalScroll = void 0, this.suppressScrollOnNewData = void 0, this.suppressScrollWhenPopupsAreOpen = void 0, this.suppressAnimationFrame = void 0, this.suppressMiddleClickScrolls = void 0, this.suppressPreventDefaultOnMouseWheel = void 0, this.scrollbarWidth = void 0, this.rowSelection = void 0, this.cellSelection = void 0, this.rowMultiSelectWithClick = void 0, this.suppressRowDeselection = void 0, this.suppressRowClickSelection = void 0, this.suppressCellFocus = void 0, this.suppressHeaderFocus = void 0, this.selectionColumnDef = void 0, this.rowNumbers = void 0, this.suppressMultiRangeSelection = void 0, this.enableCellTextSelection = void 0, this.enableRangeSelection = void 0, this.enableRangeHandle = void 0, this.enableFillHandle = void 0, this.fillHandleDirection = void 0, this.suppressClearOnFillReduction = void 0, this.sortingOrder = void 0, this.accentedSort = void 0, this.unSortIcon = void 0, this.suppressMultiSort = void 0, this.alwaysMultiSort = void 0, this.multiSortKey = void 0, this.suppressMaintainUnsortedOrder = void 0, this.icons = void 0, this.rowHeight = void 0, this.rowStyle = void 0, this.rowClass = void 0, this.rowClassRules = void 0, this.suppressRowHoverHighlight = void 0, this.suppressRowTransform = void 0, this.columnHoverHighlight = void 0, this.gridId = void 0, this.deltaSort = void 0, this.treeDataDisplayType = void 0, this.enableGroupEdit = void 0, this.initialState = void 0, this.theme = void 0, this.loadThemeGoogleFonts = void 0, this.themeCssLayer = void 0, this.styleNonce = void 0, this.themeStyleContainer = void 0, this.getContextMenuItems = void 0, this.getMainMenuItems = void 0, this.postProcessPopup = void 0, this.processUnpinnedColumns = void 0, this.processCellForClipboard = void 0, this.processHeaderForClipboard = void 0, this.processGroupHeaderForClipboard = void 0, this.processCellFromClipboard = void 0, this.sendToClipboard = void 0, this.processDataFromClipboard = void 0, this.isExternalFilterPresent = void 0, this.doesExternalFilterPass = void 0, this.getChartToolbarItems = void 0, this.createChartContainer = void 0, this.focusGridInnerElement = void 0, this.navigateToNextHeader = void 0, this.tabToNextHeader = void 0, this.navigateToNextCell = void 0, this.tabToNextCell = void 0, this.getLocaleText = void 0, this.getDocument = void 0, this.paginationNumberFormatter = void 0, this.getGroupRowAgg = void 0, this.isGroupOpenByDefault = void 0, this.initialGroupOrderComparator = void 0, this.processPivotResultColDef = void 0, this.processPivotResultColGroupDef = void 0, this.getDataPath = void 0, this.getChildCount = void 0, this.getServerSideGroupLevelParams = void 0, this.isServerSideGroupOpenByDefault = void 0, this.isApplyServerSideTransaction = void 0, this.isServerSideGroup = void 0, this.getServerSideGroupKey = void 0, this.getBusinessKeyForNode = void 0, this.getRowId = void 0, this.resetRowDataOnUpdate = void 0, this.processRowPostCreate = void 0, this.isRowSelectable = void 0, this.isRowMaster = void 0, this.fillOperation = void 0, this.postSortRows = void 0, this.getRowStyle = void 0, this.getRowClass = void 0, this.getRowHeight = void 0, this.isFullWidthRow = void 0, this.toolPanelVisibleChanged = new n, this.toolPanelSizeChanged = new n, this.columnMenuVisibleChanged = new n, this.contextMenuVisibleChanged = new n, this.cutStart = new n, this.cutEnd = new n, this.pasteStart = new n, this.pasteEnd = new n, this.columnVisible = new n, this.columnPinned = new n, this.columnResized = new n, this.columnMoved = new n, this.columnValueChanged = new n, this.columnPivotModeChanged = new n, this.columnPivotChanged = new n, this.columnGroupOpened = new n, this.newColumnsLoaded = new n, this.gridColumnsChanged = new n, this.displayedColumnsChanged = new n, this.virtualColumnsChanged = new n, this.columnEverythingChanged = new n, this.columnHeaderMouseOver = new n, this.columnHeaderMouseLeave = new n, this.columnHeaderClicked = new n, this.columnHeaderContextMenu = new n, this.componentStateChanged = new n, this.cellValueChanged = new n, this.cellEditRequest = new n, this.rowValueChanged = new n, this.cellEditingStarted = new n, this.cellEditingStopped = new n, this.rowEditingStarted = new n, this.rowEditingStopped = new n, this.undoStarted = new n, this.undoEnded = new n, this.redoStarted = new n, this.redoEnded = new n, this.cellSelectionDeleteStart = new n, this.cellSelectionDeleteEnd = new n, this.rangeDeleteStart = new n, this.rangeDeleteEnd = new n, this.fillStart = new n, this.fillEnd = new n, this.filterOpened = new n, this.filterChanged = new n, this.filterModified = new n, this.advancedFilterBuilderVisibleChanged = new n, this.findChanged = new n, this.chartCreated = new n, this.chartRangeSelectionChanged = new n, this.chartOptionsChanged = new n, this.chartDestroyed = new n, this.cellKeyDown = new n, this.gridReady = new n, this.firstDataRendered = new n, this.gridSizeChanged = new n, this.modelUpdated = new n, this.virtualRowRemoved = new n, this.viewportChanged = new n, this.bodyScroll = new n, this.bodyScrollEnd = new n, this.dragStarted = new n, this.dragStopped = new n, this.dragCancelled = new n, this.stateUpdated = new n, this.paginationChanged = new n, this.rowDragEnter = new n, this.rowDragMove = new n, this.rowDragLeave = new n, this.rowDragEnd = new n, this.rowDragCancel = new n, this.rowResizeStarted = new n, this.rowResizeEnded = new n, this.columnRowGroupChanged = new n, this.rowGroupOpened = new n, this.expandOrCollapseAll = new n, this.pivotMaxColumnsExceeded = new n, this.pinnedRowDataChanged = new n, this.pinnedRowsChanged = new n, this.rowDataUpdated = new n, this.asyncTransactionsFlushed = new n, this.storeRefreshed = new n, this.headerFocused = new n, this.cellClicked = new n, this.cellDoubleClicked = new n, this.cellFocused = new n, this.cellMouseOver = new n, this.cellMouseOut = new n, this.cellMouseDown = new n, this.rowClicked = new n, this.rowDoubleClicked = new n, this.rowSelected = new n, this.selectionChanged = new n, this.cellContextMenu = new n, this.rangeSelectionChanged = new n, this.cellSelectionChanged = new n, this.tooltipShow = new n, this.tooltipHide = new n, this.sortChanged = new n, this._nativeElement = s.nativeElement, this._fullyReady.then(() => {
                    this._holdEvents = !1
                })
            }
            ngAfterViewInit() {
                this._angularFrameworkOverrides.runOutsideAngular(() => {
                    this._frameworkCompWrapper.setViewContainerRef(this._viewContainerRef, this._angularFrameworkOverrides);
                    let s = Object.keys(this).filter(u => !(u.startsWith("_") || u == "gridOptions" || u == "modules" || this[u] instanceof n)),
                        i = {};
                    s.forEach(u => {
                        let p = K(u, this[u]);
                        i[u] = p
                    });
                    let r = x(this.gridOptions, i, s),
                        a = {
                            globalListener: this.globalListener.bind(this),
                            frameworkOverrides: this._angularFrameworkOverrides,
                            providedBeanInstances: {
                                frameworkCompWrapper: this._frameworkCompWrapper
                            },
                            modules: this.modules || [],
                            setThemeOnGridDiv: !0
                        },
                        l = I(this._nativeElement, r, a);
                    l && (this.api = l), this._initialised = !0, this._resolveFullyReady()
                })
            }
            ngOnChanges(s) {
                this._initialised && this._angularFrameworkOverrides.runOutsideAngular(() => {
                    let i = {};
                    for (let r of Object.keys(s)) {
                        let a = s[r];
                        i[r] = a.currentValue
                    }
                    A(i, this.api)
                })
            }
            ngOnDestroy() {
                this._initialised && (this._destroyed = !0, this.api ? .destroy())
            }
            isEmitterUsed(s) {
                let r = this[s],
                    a = r ? .observed ? ? r ? .observers ? .length > 0,
                    l = `on${s.charAt(0).toUpperCase()}${s.substring(1)}`,
                    u = !!this.gridOptions && !!this.gridOptions[l];
                return a || u
            }
            globalListener(s, i) {
                if (this._destroyed) return;
                let r = this[s];
                if (r && this.isEmitterUsed(s)) {
                    let a = () => this._angularFrameworkOverrides.runInsideAngular(() => r.emit(i));
                    this._holdEvents ? this._fullyReady.then(() => a()) : a()
                }
            }
        };
        t.\u0275fac = function(i) {
            return new(i || t)(c(E), c(f), c(V), c(W))
        }, t.\u0275cmp = S({
            type: t,
            selectors: [
                ["ag-grid-angular"]
            ],
            inputs: {
                gridOptions: "gridOptions",
                modules: "modules",
                statusBar: "statusBar",
                sideBar: "sideBar",
                suppressContextMenu: [2, "suppressContextMenu", "suppressContextMenu", e],
                preventDefaultOnContextMenu: [2, "preventDefaultOnContextMenu", "preventDefaultOnContextMenu", e],
                allowContextMenuWithControlKey: [2, "allowContextMenuWithControlKey", "allowContextMenuWithControlKey", e],
                columnMenu: "columnMenu",
                suppressMenuHide: [2, "suppressMenuHide", "suppressMenuHide", e],
                enableBrowserTooltips: [2, "enableBrowserTooltips", "enableBrowserTooltips", e],
                tooltipTrigger: "tooltipTrigger",
                tooltipShowDelay: "tooltipShowDelay",
                tooltipHideDelay: "tooltipHideDelay",
                tooltipMouseTrack: [2, "tooltipMouseTrack", "tooltipMouseTrack", e],
                tooltipShowMode: "tooltipShowMode",
                tooltipInteraction: [2, "tooltipInteraction", "tooltipInteraction", e],
                popupParent: "popupParent",
                copyHeadersToClipboard: [2, "copyHeadersToClipboard", "copyHeadersToClipboard", e],
                copyGroupHeadersToClipboard: [2, "copyGroupHeadersToClipboard", "copyGroupHeadersToClipboard", e],
                clipboardDelimiter: "clipboardDelimiter",
                suppressCopyRowsToClipboard: [2, "suppressCopyRowsToClipboard", "suppressCopyRowsToClipboard", e],
                suppressCopySingleCellRanges: [2, "suppressCopySingleCellRanges", "suppressCopySingleCellRanges", e],
                suppressLastEmptyLineOnPaste: [2, "suppressLastEmptyLineOnPaste", "suppressLastEmptyLineOnPaste", e],
                suppressClipboardPaste: [2, "suppressClipboardPaste", "suppressClipboardPaste", e],
                suppressClipboardApi: [2, "suppressClipboardApi", "suppressClipboardApi", e],
                suppressCutToClipboard: [2, "suppressCutToClipboard", "suppressCutToClipboard", e],
                columnDefs: "columnDefs",
                defaultColDef: "defaultColDef",
                defaultColGroupDef: "defaultColGroupDef",
                columnTypes: "columnTypes",
                dataTypeDefinitions: "dataTypeDefinitions",
                maintainColumnOrder: [2, "maintainColumnOrder", "maintainColumnOrder", e],
                enableStrictPivotColumnOrder: [2, "enableStrictPivotColumnOrder", "enableStrictPivotColumnOrder", e],
                suppressFieldDotNotation: [2, "suppressFieldDotNotation", "suppressFieldDotNotation", e],
                headerHeight: "headerHeight",
                groupHeaderHeight: "groupHeaderHeight",
                floatingFiltersHeight: "floatingFiltersHeight",
                pivotHeaderHeight: "pivotHeaderHeight",
                pivotGroupHeaderHeight: "pivotGroupHeaderHeight",
                allowDragFromColumnsToolPanel: [2, "allowDragFromColumnsToolPanel", "allowDragFromColumnsToolPanel", e],
                suppressMovableColumns: [2, "suppressMovableColumns", "suppressMovableColumns", e],
                suppressColumnMoveAnimation: [2, "suppressColumnMoveAnimation", "suppressColumnMoveAnimation", e],
                suppressMoveWhenColumnDragging: [2, "suppressMoveWhenColumnDragging", "suppressMoveWhenColumnDragging", e],
                suppressDragLeaveHidesColumns: [2, "suppressDragLeaveHidesColumns", "suppressDragLeaveHidesColumns", e],
                suppressGroupChangesColumnVisibility: "suppressGroupChangesColumnVisibility",
                suppressMakeColumnVisibleAfterUnGroup: [2, "suppressMakeColumnVisibleAfterUnGroup", "suppressMakeColumnVisibleAfterUnGroup", e],
                suppressRowGroupHidesColumns: [2, "suppressRowGroupHidesColumns", "suppressRowGroupHidesColumns", e],
                colResizeDefault: "colResizeDefault",
                suppressAutoSize: [2, "suppressAutoSize", "suppressAutoSize", e],
                autoSizePadding: "autoSizePadding",
                skipHeaderOnAutoSize: [2, "skipHeaderOnAutoSize", "skipHeaderOnAutoSize", e],
                autoSizeStrategy: "autoSizeStrategy",
                components: "components",
                editType: "editType",
                singleClickEdit: [2, "singleClickEdit", "singleClickEdit", e],
                suppressClickEdit: [2, "suppressClickEdit", "suppressClickEdit", e],
                readOnlyEdit: [2, "readOnlyEdit", "readOnlyEdit", e],
                stopEditingWhenCellsLoseFocus: [2, "stopEditingWhenCellsLoseFocus", "stopEditingWhenCellsLoseFocus", e],
                enterNavigatesVertically: [2, "enterNavigatesVertically", "enterNavigatesVertically", e],
                enterNavigatesVerticallyAfterEdit: [2, "enterNavigatesVerticallyAfterEdit", "enterNavigatesVerticallyAfterEdit", e],
                enableCellEditingOnBackspace: [2, "enableCellEditingOnBackspace", "enableCellEditingOnBackspace", e],
                undoRedoCellEditing: [2, "undoRedoCellEditing", "undoRedoCellEditing", e],
                undoRedoCellEditingLimit: "undoRedoCellEditingLimit",
                defaultCsvExportParams: "defaultCsvExportParams",
                suppressCsvExport: [2, "suppressCsvExport", "suppressCsvExport", e],
                defaultExcelExportParams: "defaultExcelExportParams",
                suppressExcelExport: [2, "suppressExcelExport", "suppressExcelExport", e],
                excelStyles: "excelStyles",
                findSearchValue: "findSearchValue",
                findOptions: "findOptions",
                quickFilterText: "quickFilterText",
                cacheQuickFilter: [2, "cacheQuickFilter", "cacheQuickFilter", e],
                includeHiddenColumnsInQuickFilter: [2, "includeHiddenColumnsInQuickFilter", "includeHiddenColumnsInQuickFilter", e],
                quickFilterParser: "quickFilterParser",
                quickFilterMatcher: "quickFilterMatcher",
                applyQuickFilterBeforePivotOrAgg: [2, "applyQuickFilterBeforePivotOrAgg", "applyQuickFilterBeforePivotOrAgg", e],
                excludeChildrenWhenTreeDataFiltering: [2, "excludeChildrenWhenTreeDataFiltering", "excludeChildrenWhenTreeDataFiltering", e],
                enableAdvancedFilter: [2, "enableAdvancedFilter", "enableAdvancedFilter", e],
                alwaysPassFilter: "alwaysPassFilter",
                includeHiddenColumnsInAdvancedFilter: [2, "includeHiddenColumnsInAdvancedFilter", "includeHiddenColumnsInAdvancedFilter", e],
                advancedFilterParent: "advancedFilterParent",
                advancedFilterBuilderParams: "advancedFilterBuilderParams",
                suppressAdvancedFilterEval: [2, "suppressAdvancedFilterEval", "suppressAdvancedFilterEval", e],
                suppressSetFilterByDefault: [2, "suppressSetFilterByDefault", "suppressSetFilterByDefault", e],
                enableCharts: [2, "enableCharts", "enableCharts", e],
                chartThemes: "chartThemes",
                customChartThemes: "customChartThemes",
                chartThemeOverrides: "chartThemeOverrides",
                chartToolPanelsDef: "chartToolPanelsDef",
                chartMenuItems: "chartMenuItems",
                loadingCellRenderer: "loadingCellRenderer",
                loadingCellRendererParams: "loadingCellRendererParams",
                loadingCellRendererSelector: "loadingCellRendererSelector",
                localeText: "localeText",
                masterDetail: [2, "masterDetail", "masterDetail", e],
                keepDetailRows: [2, "keepDetailRows", "keepDetailRows", e],
                keepDetailRowsCount: "keepDetailRowsCount",
                detailCellRenderer: "detailCellRenderer",
                detailCellRendererParams: "detailCellRendererParams",
                detailRowHeight: "detailRowHeight",
                detailRowAutoHeight: [2, "detailRowAutoHeight", "detailRowAutoHeight", e],
                context: "context",
                alignedGrids: "alignedGrids",
                tabIndex: "tabIndex",
                rowBuffer: "rowBuffer",
                valueCache: [2, "valueCache", "valueCache", e],
                valueCacheNeverExpires: [2, "valueCacheNeverExpires", "valueCacheNeverExpires", e],
                enableCellExpressions: [2, "enableCellExpressions", "enableCellExpressions", e],
                suppressTouch: [2, "suppressTouch", "suppressTouch", e],
                suppressFocusAfterRefresh: [2, "suppressFocusAfterRefresh", "suppressFocusAfterRefresh", e],
                suppressBrowserResizeObserver: [2, "suppressBrowserResizeObserver", "suppressBrowserResizeObserver", e],
                suppressPropertyNamesCheck: [2, "suppressPropertyNamesCheck", "suppressPropertyNamesCheck", e],
                suppressChangeDetection: [2, "suppressChangeDetection", "suppressChangeDetection", e],
                debug: [2, "debug", "debug", e],
                loading: [2, "loading", "loading", e],
                overlayLoadingTemplate: "overlayLoadingTemplate",
                loadingOverlayComponent: "loadingOverlayComponent",
                loadingOverlayComponentParams: "loadingOverlayComponentParams",
                suppressLoadingOverlay: [2, "suppressLoadingOverlay", "suppressLoadingOverlay", e],
                overlayNoRowsTemplate: "overlayNoRowsTemplate",
                noRowsOverlayComponent: "noRowsOverlayComponent",
                noRowsOverlayComponentParams: "noRowsOverlayComponentParams",
                suppressNoRowsOverlay: [2, "suppressNoRowsOverlay", "suppressNoRowsOverlay", e],
                pagination: [2, "pagination", "pagination", e],
                paginationPageSize: "paginationPageSize",
                paginationPageSizeSelector: "paginationPageSizeSelector",
                paginationAutoPageSize: [2, "paginationAutoPageSize", "paginationAutoPageSize", e],
                paginateChildRows: [2, "paginateChildRows", "paginateChildRows", e],
                suppressPaginationPanel: [2, "suppressPaginationPanel", "suppressPaginationPanel", e],
                pivotMode: [2, "pivotMode", "pivotMode", e],
                pivotPanelShow: "pivotPanelShow",
                pivotMaxGeneratedColumns: "pivotMaxGeneratedColumns",
                pivotDefaultExpanded: "pivotDefaultExpanded",
                pivotColumnGroupTotals: "pivotColumnGroupTotals",
                pivotRowTotals: "pivotRowTotals",
                pivotSuppressAutoColumn: [2, "pivotSuppressAutoColumn", "pivotSuppressAutoColumn", e],
                suppressExpandablePivotGroups: [2, "suppressExpandablePivotGroups", "suppressExpandablePivotGroups", e],
                functionsReadOnly: [2, "functionsReadOnly", "functionsReadOnly", e],
                aggFuncs: "aggFuncs",
                suppressAggFuncInHeader: [2, "suppressAggFuncInHeader", "suppressAggFuncInHeader", e],
                alwaysAggregateAtRootLevel: [2, "alwaysAggregateAtRootLevel", "alwaysAggregateAtRootLevel", e],
                aggregateOnlyChangedColumns: [2, "aggregateOnlyChangedColumns", "aggregateOnlyChangedColumns", e],
                suppressAggFilteredOnly: [2, "suppressAggFilteredOnly", "suppressAggFilteredOnly", e],
                removePivotHeaderRowWhenSingleValueColumn: [2, "removePivotHeaderRowWhenSingleValueColumn", "removePivotHeaderRowWhenSingleValueColumn", e],
                animateRows: [2, "animateRows", "animateRows", e],
                cellFlashDuration: "cellFlashDuration",
                cellFadeDuration: "cellFadeDuration",
                allowShowChangeAfterFilter: [2, "allowShowChangeAfterFilter", "allowShowChangeAfterFilter", e],
                domLayout: "domLayout",
                ensureDomOrder: [2, "ensureDomOrder", "ensureDomOrder", e],
                enableCellSpan: [2, "enableCellSpan", "enableCellSpan", e],
                enableRtl: [2, "enableRtl", "enableRtl", e],
                suppressColumnVirtualisation: [2, "suppressColumnVirtualisation", "suppressColumnVirtualisation", e],
                suppressMaxRenderedRowRestriction: [2, "suppressMaxRenderedRowRestriction", "suppressMaxRenderedRowRestriction", e],
                suppressRowVirtualisation: [2, "suppressRowVirtualisation", "suppressRowVirtualisation", e],
                rowDragManaged: [2, "rowDragManaged", "rowDragManaged", e],
                suppressRowDrag: [2, "suppressRowDrag", "suppressRowDrag", e],
                suppressMoveWhenRowDragging: [2, "suppressMoveWhenRowDragging", "suppressMoveWhenRowDragging", e],
                rowDragEntireRow: [2, "rowDragEntireRow", "rowDragEntireRow", e],
                rowDragMultiRow: [2, "rowDragMultiRow", "rowDragMultiRow", e],
                rowDragText: "rowDragText",
                dragAndDropImageComponent: "dragAndDropImageComponent",
                dragAndDropImageComponentParams: "dragAndDropImageComponentParams",
                fullWidthCellRenderer: "fullWidthCellRenderer",
                fullWidthCellRendererParams: "fullWidthCellRendererParams",
                embedFullWidthRows: [2, "embedFullWidthRows", "embedFullWidthRows", e],
                groupDisplayType: "groupDisplayType",
                groupDefaultExpanded: "groupDefaultExpanded",
                autoGroupColumnDef: "autoGroupColumnDef",
                groupMaintainOrder: [2, "groupMaintainOrder", "groupMaintainOrder", e],
                groupSelectsChildren: [2, "groupSelectsChildren", "groupSelectsChildren", e],
                groupLockGroupColumns: "groupLockGroupColumns",
                groupAggFiltering: "groupAggFiltering",
                groupTotalRow: "groupTotalRow",
                grandTotalRow: "grandTotalRow",
                suppressStickyTotalRow: "suppressStickyTotalRow",
                groupSuppressBlankHeader: [2, "groupSuppressBlankHeader", "groupSuppressBlankHeader", e],
                groupSelectsFiltered: [2, "groupSelectsFiltered", "groupSelectsFiltered", e],
                showOpenedGroup: [2, "showOpenedGroup", "showOpenedGroup", e],
                groupHideParentOfSingleChild: "groupHideParentOfSingleChild",
                groupRemoveSingleChildren: [2, "groupRemoveSingleChildren", "groupRemoveSingleChildren", e],
                groupRemoveLowestSingleChildren: [2, "groupRemoveLowestSingleChildren", "groupRemoveLowestSingleChildren", e],
                groupHideOpenParents: [2, "groupHideOpenParents", "groupHideOpenParents", e],
                groupAllowUnbalanced: [2, "groupAllowUnbalanced", "groupAllowUnbalanced", e],
                rowGroupPanelShow: "rowGroupPanelShow",
                groupRowRenderer: "groupRowRenderer",
                groupRowRendererParams: "groupRowRendererParams",
                treeData: [2, "treeData", "treeData", e],
                treeDataChildrenField: "treeDataChildrenField",
                treeDataParentIdField: "treeDataParentIdField",
                rowGroupPanelSuppressSort: [2, "rowGroupPanelSuppressSort", "rowGroupPanelSuppressSort", e],
                suppressGroupRowsSticky: [2, "suppressGroupRowsSticky", "suppressGroupRowsSticky", e],
                pinnedTopRowData: "pinnedTopRowData",
                pinnedBottomRowData: "pinnedBottomRowData",
                enableRowPinning: "enableRowPinning",
                isRowPinnable: "isRowPinnable",
                isRowPinned: "isRowPinned",
                rowModelType: "rowModelType",
                rowData: "rowData",
                asyncTransactionWaitMillis: "asyncTransactionWaitMillis",
                suppressModelUpdateAfterUpdateTransaction: [2, "suppressModelUpdateAfterUpdateTransaction", "suppressModelUpdateAfterUpdateTransaction", e],
                datasource: "datasource",
                cacheOverflowSize: "cacheOverflowSize",
                infiniteInitialRowCount: "infiniteInitialRowCount",
                serverSideInitialRowCount: "serverSideInitialRowCount",
                suppressServerSideFullWidthLoadingRow: [2, "suppressServerSideFullWidthLoadingRow", "suppressServerSideFullWidthLoadingRow", e],
                cacheBlockSize: "cacheBlockSize",
                maxBlocksInCache: "maxBlocksInCache",
                maxConcurrentDatasourceRequests: "maxConcurrentDatasourceRequests",
                blockLoadDebounceMillis: "blockLoadDebounceMillis",
                purgeClosedRowNodes: [2, "purgeClosedRowNodes", "purgeClosedRowNodes", e],
                serverSideDatasource: "serverSideDatasource",
                serverSideSortAllLevels: [2, "serverSideSortAllLevels", "serverSideSortAllLevels", e],
                serverSideEnableClientSideSort: [2, "serverSideEnableClientSideSort", "serverSideEnableClientSideSort", e],
                serverSideOnlyRefreshFilteredGroups: [2, "serverSideOnlyRefreshFilteredGroups", "serverSideOnlyRefreshFilteredGroups", e],
                serverSidePivotResultFieldSeparator: "serverSidePivotResultFieldSeparator",
                viewportDatasource: "viewportDatasource",
                viewportRowModelPageSize: "viewportRowModelPageSize",
                viewportRowModelBufferSize: "viewportRowModelBufferSize",
                alwaysShowHorizontalScroll: [2, "alwaysShowHorizontalScroll", "alwaysShowHorizontalScroll", e],
                alwaysShowVerticalScroll: [2, "alwaysShowVerticalScroll", "alwaysShowVerticalScroll", e],
                debounceVerticalScrollbar: [2, "debounceVerticalScrollbar", "debounceVerticalScrollbar", e],
                suppressHorizontalScroll: [2, "suppressHorizontalScroll", "suppressHorizontalScroll", e],
                suppressScrollOnNewData: [2, "suppressScrollOnNewData", "suppressScrollOnNewData", e],
                suppressScrollWhenPopupsAreOpen: [2, "suppressScrollWhenPopupsAreOpen", "suppressScrollWhenPopupsAreOpen", e],
                suppressAnimationFrame: [2, "suppressAnimationFrame", "suppressAnimationFrame", e],
                suppressMiddleClickScrolls: [2, "suppressMiddleClickScrolls", "suppressMiddleClickScrolls", e],
                suppressPreventDefaultOnMouseWheel: [2, "suppressPreventDefaultOnMouseWheel", "suppressPreventDefaultOnMouseWheel", e],
                scrollbarWidth: "scrollbarWidth",
                rowSelection: "rowSelection",
                cellSelection: "cellSelection",
                rowMultiSelectWithClick: [2, "rowMultiSelectWithClick", "rowMultiSelectWithClick", e],
                suppressRowDeselection: [2, "suppressRowDeselection", "suppressRowDeselection", e],
                suppressRowClickSelection: [2, "suppressRowClickSelection", "suppressRowClickSelection", e],
                suppressCellFocus: [2, "suppressCellFocus", "suppressCellFocus", e],
                suppressHeaderFocus: [2, "suppressHeaderFocus", "suppressHeaderFocus", e],
                selectionColumnDef: "selectionColumnDef",
                rowNumbers: "rowNumbers",
                suppressMultiRangeSelection: [2, "suppressMultiRangeSelection", "suppressMultiRangeSelection", e],
                enableCellTextSelection: [2, "enableCellTextSelection", "enableCellTextSelection", e],
                enableRangeSelection: [2, "enableRangeSelection", "enableRangeSelection", e],
                enableRangeHandle: [2, "enableRangeHandle", "enableRangeHandle", e],
                enableFillHandle: [2, "enableFillHandle", "enableFillHandle", e],
                fillHandleDirection: "fillHandleDirection",
                suppressClearOnFillReduction: [2, "suppressClearOnFillReduction", "suppressClearOnFillReduction", e],
                sortingOrder: "sortingOrder",
                accentedSort: [2, "accentedSort", "accentedSort", e],
                unSortIcon: [2, "unSortIcon", "unSortIcon", e],
                suppressMultiSort: [2, "suppressMultiSort", "suppressMultiSort", e],
                alwaysMultiSort: [2, "alwaysMultiSort", "alwaysMultiSort", e],
                multiSortKey: "multiSortKey",
                suppressMaintainUnsortedOrder: [2, "suppressMaintainUnsortedOrder", "suppressMaintainUnsortedOrder", e],
                icons: "icons",
                rowHeight: "rowHeight",
                rowStyle: "rowStyle",
                rowClass: "rowClass",
                rowClassRules: "rowClassRules",
                suppressRowHoverHighlight: [2, "suppressRowHoverHighlight", "suppressRowHoverHighlight", e],
                suppressRowTransform: [2, "suppressRowTransform", "suppressRowTransform", e],
                columnHoverHighlight: [2, "columnHoverHighlight", "columnHoverHighlight", e],
                gridId: "gridId",
                deltaSort: [2, "deltaSort", "deltaSort", e],
                treeDataDisplayType: "treeDataDisplayType",
                enableGroupEdit: [2, "enableGroupEdit", "enableGroupEdit", e],
                initialState: "initialState",
                theme: "theme",
                loadThemeGoogleFonts: [2, "loadThemeGoogleFonts", "loadThemeGoogleFonts", e],
                themeCssLayer: "themeCssLayer",
                styleNonce: "styleNonce",
                themeStyleContainer: "themeStyleContainer",
                getContextMenuItems: "getContextMenuItems",
                getMainMenuItems: "getMainMenuItems",
                postProcessPopup: "postProcessPopup",
                processUnpinnedColumns: "processUnpinnedColumns",
                processCellForClipboard: "processCellForClipboard",
                processHeaderForClipboard: "processHeaderForClipboard",
                processGroupHeaderForClipboard: "processGroupHeaderForClipboard",
                processCellFromClipboard: "processCellFromClipboard",
                sendToClipboard: "sendToClipboard",
                processDataFromClipboard: "processDataFromClipboard",
                isExternalFilterPresent: "isExternalFilterPresent",
                doesExternalFilterPass: "doesExternalFilterPass",
                getChartToolbarItems: "getChartToolbarItems",
                createChartContainer: "createChartContainer",
                focusGridInnerElement: "focusGridInnerElement",
                navigateToNextHeader: "navigateToNextHeader",
                tabToNextHeader: "tabToNextHeader",
                navigateToNextCell: "navigateToNextCell",
                tabToNextCell: "tabToNextCell",
                getLocaleText: "getLocaleText",
                getDocument: "getDocument",
                paginationNumberFormatter: "paginationNumberFormatter",
                getGroupRowAgg: "getGroupRowAgg",
                isGroupOpenByDefault: "isGroupOpenByDefault",
                initialGroupOrderComparator: "initialGroupOrderComparator",
                processPivotResultColDef: "processPivotResultColDef",
                processPivotResultColGroupDef: "processPivotResultColGroupDef",
                getDataPath: "getDataPath",
                getChildCount: "getChildCount",
                getServerSideGroupLevelParams: "getServerSideGroupLevelParams",
                isServerSideGroupOpenByDefault: "isServerSideGroupOpenByDefault",
                isApplyServerSideTransaction: "isApplyServerSideTransaction",
                isServerSideGroup: "isServerSideGroup",
                getServerSideGroupKey: "getServerSideGroupKey",
                getBusinessKeyForNode: "getBusinessKeyForNode",
                getRowId: "getRowId",
                resetRowDataOnUpdate: [2, "resetRowDataOnUpdate", "resetRowDataOnUpdate", e],
                processRowPostCreate: "processRowPostCreate",
                isRowSelectable: "isRowSelectable",
                isRowMaster: "isRowMaster",
                fillOperation: "fillOperation",
                postSortRows: "postSortRows",
                getRowStyle: "getRowStyle",
                getRowClass: "getRowClass",
                getRowHeight: "getRowHeight",
                isFullWidthRow: "isFullWidthRow"
            },
            outputs: {
                toolPanelVisibleChanged: "toolPanelVisibleChanged",
                toolPanelSizeChanged: "toolPanelSizeChanged",
                columnMenuVisibleChanged: "columnMenuVisibleChanged",
                contextMenuVisibleChanged: "contextMenuVisibleChanged",
                cutStart: "cutStart",
                cutEnd: "cutEnd",
                pasteStart: "pasteStart",
                pasteEnd: "pasteEnd",
                columnVisible: "columnVisible",
                columnPinned: "columnPinned",
                columnResized: "columnResized",
                columnMoved: "columnMoved",
                columnValueChanged: "columnValueChanged",
                columnPivotModeChanged: "columnPivotModeChanged",
                columnPivotChanged: "columnPivotChanged",
                columnGroupOpened: "columnGroupOpened",
                newColumnsLoaded: "newColumnsLoaded",
                gridColumnsChanged: "gridColumnsChanged",
                displayedColumnsChanged: "displayedColumnsChanged",
                virtualColumnsChanged: "virtualColumnsChanged",
                columnEverythingChanged: "columnEverythingChanged",
                columnHeaderMouseOver: "columnHeaderMouseOver",
                columnHeaderMouseLeave: "columnHeaderMouseLeave",
                columnHeaderClicked: "columnHeaderClicked",
                columnHeaderContextMenu: "columnHeaderContextMenu",
                componentStateChanged: "componentStateChanged",
                cellValueChanged: "cellValueChanged",
                cellEditRequest: "cellEditRequest",
                rowValueChanged: "rowValueChanged",
                cellEditingStarted: "cellEditingStarted",
                cellEditingStopped: "cellEditingStopped",
                rowEditingStarted: "rowEditingStarted",
                rowEditingStopped: "rowEditingStopped",
                undoStarted: "undoStarted",
                undoEnded: "undoEnded",
                redoStarted: "redoStarted",
                redoEnded: "redoEnded",
                cellSelectionDeleteStart: "cellSelectionDeleteStart",
                cellSelectionDeleteEnd: "cellSelectionDeleteEnd",
                rangeDeleteStart: "rangeDeleteStart",
                rangeDeleteEnd: "rangeDeleteEnd",
                fillStart: "fillStart",
                fillEnd: "fillEnd",
                filterOpened: "filterOpened",
                filterChanged: "filterChanged",
                filterModified: "filterModified",
                advancedFilterBuilderVisibleChanged: "advancedFilterBuilderVisibleChanged",
                findChanged: "findChanged",
                chartCreated: "chartCreated",
                chartRangeSelectionChanged: "chartRangeSelectionChanged",
                chartOptionsChanged: "chartOptionsChanged",
                chartDestroyed: "chartDestroyed",
                cellKeyDown: "cellKeyDown",
                gridReady: "gridReady",
                firstDataRendered: "firstDataRendered",
                gridSizeChanged: "gridSizeChanged",
                modelUpdated: "modelUpdated",
                virtualRowRemoved: "virtualRowRemoved",
                viewportChanged: "viewportChanged",
                bodyScroll: "bodyScroll",
                bodyScrollEnd: "bodyScrollEnd",
                dragStarted: "dragStarted",
                dragStopped: "dragStopped",
                dragCancelled: "dragCancelled",
                stateUpdated: "stateUpdated",
                paginationChanged: "paginationChanged",
                rowDragEnter: "rowDragEnter",
                rowDragMove: "rowDragMove",
                rowDragLeave: "rowDragLeave",
                rowDragEnd: "rowDragEnd",
                rowDragCancel: "rowDragCancel",
                rowResizeStarted: "rowResizeStarted",
                rowResizeEnded: "rowResizeEnded",
                columnRowGroupChanged: "columnRowGroupChanged",
                rowGroupOpened: "rowGroupOpened",
                expandOrCollapseAll: "expandOrCollapseAll",
                pivotMaxColumnsExceeded: "pivotMaxColumnsExceeded",
                pinnedRowDataChanged: "pinnedRowDataChanged",
                pinnedRowsChanged: "pinnedRowsChanged",
                rowDataUpdated: "rowDataUpdated",
                asyncTransactionsFlushed: "asyncTransactionsFlushed",
                storeRefreshed: "storeRefreshed",
                headerFocused: "headerFocused",
                cellClicked: "cellClicked",
                cellDoubleClicked: "cellDoubleClicked",
                cellFocused: "cellFocused",
                cellMouseOver: "cellMouseOver",
                cellMouseOut: "cellMouseOut",
                cellMouseDown: "cellMouseDown",
                rowClicked: "rowClicked",
                rowDoubleClicked: "rowDoubleClicked",
                rowSelected: "rowSelected",
                selectionChanged: "selectionChanged",
                cellContextMenu: "cellContextMenu",
                rangeSelectionChanged: "rangeSelectionChanged",
                cellSelectionChanged: "cellSelectionChanged",
                tooltipShow: "tooltipShow",
                tooltipHide: "tooltipHide",
                sortChanged: "sortChanged"
            },
            features: [T([V, W]), M],
            decls: 0,
            vars: 0,
            template: function(i, r) {},
            encapsulation: 2
        });
        let o = t;
        return o
    })(),
    U = new Set(G);

function K(o, t) {
    return U.has(o) ? t === "" ? !0 : t === "false" ? !1 : t : t
}
var te = (() => {
    let t = class t {};
    t.\u0275fac = function(i) {
        return new(i || t)
    }, t.\u0275mod = H({
        type: t
    }), t.\u0275inj = b({});
    let o = t;
    return o
})();
export {
    ne as a, te as b
};