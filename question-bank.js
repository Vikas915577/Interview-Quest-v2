/* Interview Quest v3 question bank: curated questions with suggested answers, tips and follow-ups.
   Preserve the original rows at the top to keep existing saved question IDs stable. */
(function () {
  'use strict';
  const rows = [
    ["SQL","Beginner","Concept","What does SELECT do in SQL?","SELECT chooses the columns or expressions to return. Example: SELECT name, salary FROM employees; returns those two columns.","Identify the required table and columns before writing the query."],
    ["SQL","Beginner","Concept","What is WHERE used for?","WHERE filters rows before grouping. Example: SELECT * FROM employees WHERE department = 'Sales'; returns only Sales employees.","WHERE filters rows; HAVING filters grouped results."],
    ["SQL","Beginner","Concept","What is the difference between ORDER BY ASC and DESC?","ASC sorts from low to high or A to Z; DESC sorts from high to low or Z to A. ASC is the usual default.","Use a second sort key when ties need a consistent order."],
    ["SQL","Beginner","Concept","What does DISTINCT do?","DISTINCT removes duplicate combinations from the selected columns. SELECT DISTINCT department FROM employees; returns each department once.","It applies to the selected column combination, not every column in the table."],
    ["SQL","Beginner","Concept","COUNT(*) aur COUNT(column) mein kya difference hai?","COUNT(*) counts rows. COUNT(column) counts only rows where that column is not NULL.","Check NULL behavior when reconciling totals."],
    ["SQL","Beginner","Concept","How do you filter NULL values?","Use IS NULL or IS NOT NULL. Writing column = NULL does not work as intended because NULL represents an unknown or missing value.","SQL comparisons with NULL need special handling."],
    ["SQL","Beginner","Concept","What is GROUP BY used for?","GROUP BY combines rows with the same group values so aggregates can be calculated per group. Example: SELECT department, COUNT(*) FROM employees GROUP BY department;","Know the intended output grain before grouping."],
    ["SQL","Beginner","Concept","What is the difference between WHERE and HAVING?","WHERE filters individual rows before aggregation. HAVING filters groups after GROUP BY, often using COUNT, SUM or another aggregate.","Put row-level conditions in WHERE when possible."],
    ["SQL","Beginner","Concept","What does INNER JOIN return?","It returns rows where the join condition matches in both tables. Non-matching rows are excluded.","Check whether the join keys are unique; duplicates can multiply rows."],
    ["SQL","Beginner","Concept","What does LEFT JOIN return?","It returns all rows from the left table and matching data from the right table. Unmatched right-side columns are NULL.","It is useful for finding missing related records."],
    ["SQL","Intermediate","Practical","How would you find duplicate email addresses?","SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1; lists email values that occur more than once.","Agree how NULLs and upper/lowercase should be treated."],
    ["SQL","Interview","Practical","How do you find the second-highest distinct salary?","A portable approach is SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees); It returns NULL if no lower distinct salary exists.","Clarify whether the interviewer means distinct salary values or the second row after ranking."],

    ["Excel","Beginner","Concept","What is the difference between a formula and a function?","A formula is an expression entered in a cell. A function is a built-in calculation such as SUM, IF or XLOOKUP that can be used within a formula.","Explain with a small example rather than a memorized definition."],
    ["Excel","Beginner","Practical","When would you use SUMIFS?","SUMIFS adds values that meet multiple conditions, such as total sales for a region during a month.","Make sure each criteria range lines up with the sum range."],
    ["Excel","Beginner","Practical","What does COUNTIFS do?","COUNTIFS counts records or cells that meet multiple conditions, such as orders from one region in a date range.","Check date criteria and text formatting carefully."],
    ["Excel","Beginner","Concept","What is XLOOKUP used for?","XLOOKUP finds a value in a lookup range and returns the corresponding value from a result range. It can return values from either side of the lookup column and specify a not-found result.","Some older Excel versions do not support XLOOKUP."],
    ["Excel","Intermediate","Concept","VLOOKUP aur XLOOKUP mein kya difference hai?","VLOOKUP searches the first column of a table array and returns a column by index. XLOOKUP separates lookup and return ranges and supports flexible direction and match options.","Choose based on compatibility and workbook maintainability."],
    ["Excel","Beginner","Concept","What is a PivotTable?","A PivotTable summarizes data by categories using functions such as sum, count or average. Users can rearrange fields to explore patterns.","Clean headers and keep each row at a consistent record level."],
    ["Excel","Intermediate","Practical","How do you handle duplicate records in Excel?","First define what makes a record duplicate. Inspect candidates using conditional formatting or COUNTIFS, keep a backup, and only then use Remove Duplicates with the correct columns.","Never delete duplicate-looking rows before confirming the business rule."],
    ["Excel","Beginner","Concept","What is the difference between relative and absolute references?","A1 is relative and adjusts when copied. $A$1 is absolute and stays fixed. Mixed references lock only the row or column.","F4 commonly cycles reference types while editing a formula."],
    ["Excel","Intermediate","Concept","How can IFERROR help in reporting?","IFERROR returns a chosen fallback when a formula errors. It can improve readability, but should not hide important data-quality problems.","Use an explanatory message or validation flag when appropriate."],
    ["Excel","Interview","Scenario","A PivotTable total does not match the source total. What do you check?","Check the source range, filters, refresh status, data types, duplicates, blanks and aggregation choice. Reconcile a small subset to isolate the difference.","Explain the checks in order and report what you verified."],

    ["Power BI","Beginner","Concept","What is Power BI used for?","Power BI connects to data, transforms it, models relationships and calculations, and presents interactive reports to support business decisions.","Describe the path from source data to an insight a user can act on."],
    ["Power BI","Beginner","Concept","What is Power Query?","Power Query connects to, cleans, transforms and combines data before it is loaded into a model or output.","Prefer repeatable transformation steps over manual cleanup every refresh."],
    ["Power BI","Beginner","Concept","Measure aur calculated column mein kya difference hai?","A calculated column is computed per row during model processing and stored. A measure is evaluated when queried and responds to the current filter context.","Dynamic totals and ratios are usually measures."],
    ["Power BI","Intermediate","Concept","What is a star schema?","A star schema organizes measurable events in a fact table and descriptive attributes in dimension tables, typically with clear relationships.","Define fact-table grain and key relationships clearly."],
    ["Power BI","Intermediate","Concept","What is filter context in DAX?","Filter context is the set of filters affecting a DAX calculation, coming from visuals, slicers, relationships and expressions.","Explain how selecting a region changes a measure result."],
    ["Power BI","Intermediate","Concept","What does CALCULATE do in DAX?","CALCULATE evaluates an expression in a modified filter context. It is central to measures that apply or adjust filters.","Practice with small tables and be precise about the filter being changed."],
    ["Power BI","Intermediate","Concept","What is row-level security?","Row-level security restricts which data rows a user can see based on configured roles and identity. It should be tested with representative users.","Hiding a visual is not the same as securing data."],
    ["Power BI","Intermediate","Scenario","A total changes after adding a relationship. What do you inspect?","Check relationship cardinality and direction, duplicate keys, unmatched keys, filter propagation and table grain. Compare row counts and measures before and after.","Reproduce the behavior with a small example."],
    ["Power BI","Interview","Concept","What is the difference between Import and DirectQuery?","Import stores data in the model and often gives fast interactions after refresh. DirectQuery queries the source for supported operations and depends more on source performance and mode limitations.","Choose based on freshness, volume, source capacity and feature needs."],
    ["Power BI","Interview","Scenario","How would you investigate a slow Power BI report?","Measure the bottleneck. Review model size, relationship design, DAX complexity, visuals, query transformations, source performance and refresh behavior, changing one factor at a time.","Measure before and after; do not claim an optimization without evidence."],

    ["Python & Pandas","Beginner","Concept","What is the difference between a list and a tuple?","A list is mutable, so its elements can be changed. A tuple is immutable after creation. Both can hold ordered items.","Pick based on whether the collection should be changed."],
    ["Python & Pandas","Beginner","Concept","What is a dictionary in Python?","A dictionary maps keys to values and is useful for looking up information by a key. Example: employee = {'name': 'Asha', 'team': 'Sales'}.","Dictionary keys must be hashable; values can be updated."],
    ["Python & Pandas","Beginner","Concept","What is a function?","A function is a reusable block defined with def. It can accept parameters and return a result.","Small functions are easier to reuse and test."],
    ["Python & Pandas","Beginner","Concept","How do you handle errors in Python?","Use try and except for expected failures, catch specific exception types where possible, and report useful details instead of silently ignoring errors.","Do not catch every exception without a clear recovery plan."],
    ["Python & Pandas","Beginner","Practical","How do you read a CSV with pandas?","Use import pandas as pd, then df = pd.read_csv('file.csv'). Inspect df.head(), df.info() and df.shape before analysis.","Check encoding, separator, data types and expected row count."],
    ["Python & Pandas","Beginner","Practical","How do you find missing values in pandas?","df.isna().sum() counts missing values per column; df.isna().mean() gives the missing proportion per column.","Choose to keep, impute or remove values based on their meaning."],
    ["Python & Pandas","Intermediate","Practical","How do you remove duplicate rows in pandas?","Use df.drop_duplicates() for exact duplicate rows or subset=['customer_id'] if the business rule defines duplicates by that key.","Inspect duplicate records before dropping them."],
    ["Python & Pandas","Intermediate","Practical","What does groupby do in pandas?","groupby splits rows into groups and lets you aggregate or transform each group. Example: df.groupby('region')['sales'].sum().","Check missing group keys and the expected output grain."],
    ["Python & Pandas","Intermediate","Concept","merge aur concat mein kya difference hai?","merge joins DataFrames using matching key values, like a relational join. concat stacks objects along rows or columns.","Check row counts and duplicate keys after a merge."],
    ["Python & Pandas","Interview","Scenario","A pandas merge creates more rows than expected. Why?","A key may occur more than once on either side and create multiple matches. Check duplicate keys, intended cardinality, unmatched rows and merge validation.","Never assume a join is one-to-one before checking."],

    ["Data Analysis","Beginner","Concept","What is a KPI?","A key performance indicator is a defined measure used to track progress toward a goal, such as on-time delivery rate or monthly revenue.","Specify its formula, owner, time window and target."],
    ["Data Analysis","Beginner","Concept","Dimension aur measure mein kya difference hai?","A dimension describes or segments data, such as region or product. A measure is a value to analyze, such as revenue, quantity or cost.","The field's role depends on the model and use case."],
    ["Data Analysis","Beginner","Concept","What is the difference between mean and median?","Mean is the arithmetic average and can be affected by extreme values. Median is the middle value after sorting and is often more robust for skewed data.","Inspect the distribution before choosing a statistic."],
    ["Data Analysis","Intermediate","Concept","Correlation aur causation mein kya difference hai?","Correlation means variables move together statistically; it does not prove that one causes the other. Confounding, reverse direction or coincidence may explain the relationship.","Use study design and domain evidence before causal claims."],
    ["Data Analysis","Intermediate","Concept","What is data cleaning?","Data cleaning identifies and handles quality issues such as duplicates, missing values, inconsistent categories, invalid types, bad dates and out-of-range values.","Preserve raw data and document the rules applied."],
    ["Data Analysis","Intermediate","Scenario","A KPI dropped 15% this month. How do you investigate?","Validate the metric and data freshness first. Compare trends and segments, check volume and mix, find when the drop began, inspect related metrics and process changes, then test hypotheses.","Separate confirmed findings from hypotheses and propose a measurable next action."],
    ["Data Analysis","Intermediate","Concept","What is an outlier?","An outlier is an observation that differs substantially from the rest. It may be an error, a rare valid event or an important change.","Investigate its source before removing or capping it."],
    ["Data Analysis","Intermediate","Concept","What is A/B testing?","A/B testing compares outcomes for variants, ideally with random assignment and a pre-defined success metric plus guardrails.","Consider sample size, practical impact and test duration—not only a p-value."],
    ["Data Analysis","Interview","Scenario","Two dashboards show different revenue totals. What do you do?","Compare definitions, date windows, time zones, currency, filters, refresh timing, refunds, grain and transformations. Trace sample records from source to report.","Agree on a documented metric definition only after the discrepancy is explained."],
    ["Data Analysis","Interview","Scenario","How do you communicate a finding to a non-technical manager?","Lead with the business question and key finding, quantify impact, show the segment driving it, state limitations and recommend a next action in plain language.","Keep technical details available but secondary to the decision."],

    ["Data Engineering","Beginner","Concept","What is ETL?","ETL means extract data from sources, transform it into a usable shape and load it into a target system.","The exact order and implementation depend on the architecture."],
    ["Data Engineering","Beginner","Concept","What is the difference between ETL and ELT?","ETL transforms data before loading it. ELT loads data first and transforms it inside the target platform. A platform may support both patterns.","Choose based on compute, governance, latency and workload."],
    ["Data Engineering","Beginner","Concept","What is a data warehouse?","A data warehouse integrates and organizes data for reporting and analytics, often with historical records and modeled business entities.","Contrast analytical workloads with operational transactions."],
    ["Data Engineering","Intermediate","Concept","Batch aur streaming mein kya difference hai?","Batch processes bounded data on a schedule or in chunks. Streaming processes continuously arriving events and targets lower latency, with extra operational complexity.","Use the simplest method that meets freshness needs."],
    ["Data Engineering","Intermediate","Concept","What is an idempotent pipeline?","An idempotent pipeline can be rerun with the same intended inputs without producing unintended duplicates or unexpected final-state changes.","Stable keys, upserts, checkpoints and safe reprocessing help."],
    ["Data Engineering","Intermediate","Scenario","A daily pipeline failed halfway through. How do you recover it?","Identify the failed stage and last reliable checkpoint, inspect logs and quality checks, fix the cause, then rerun safely and reconcile output counts.","Do not rerun blindly if it can duplicate data."],
    ["Data Engineering","Intermediate","Concept","Why are retries and logging important?","Retries can recover from transient failures, while logs support diagnosis and audit. Retries need limits and should account for idempotency.","Record run ID, stage, timestamp, error and row counts."],
    ["Data Engineering","Intermediate","Concept","What is an API?","An API defines how systems exchange requests and responses. Data pipelines may call HTTP endpoints and parse responses such as JSON.","Handle authentication, pagination, rate limits, timeouts and schema changes."],
    ["Data Engineering","Interview","Concept","Data lake aur data warehouse mein kya difference hai?","A data lake stores data in a range of formats, often with flexible schemas. A warehouse organizes governed data for analytics; many architectures combine both.","Compare governance, data types, cost and access patterns."],
    ["Data Engineering","Interview","Scenario","How would you design incremental loading?","Track a reliable change marker, extract changed records, upsert by stable key, handle late updates and deletes, and reconcile counts. Define when the checkpoint advances.","A failed run must not silently skip records."],

    ["Infor Birst","Beginner","Concept","What is Infor Birst used for?","Infor Birst is a cloud analytics and BI platform used to prepare and model data, then build reports and dashboards for business users.","Describe only the components you have actually used."],
    ["Infor Birst","Intermediate","Concept","Why is data modeling important in Birst?","A model defines how business entities, measures and relationships are represented so reports use consistent logic and aggregate correctly.","Know the grain, keys, measures and dimensions behind each report."],
    ["Infor Birst","Intermediate","Scenario","A Birst report does not match its source total. How do you investigate?","Check filters and prompts, refresh timing, transformations, joins, cardinality, metric definitions, date boundaries and aggregation. Trace a sample of records to source.","Use terminology verified against the Birst version in your environment."],
    ["Infor Birst","Intermediate","Concept","What are measures and dimensions in a BI model?","A measure is a value to aggregate or analyze, such as revenue. A dimension provides context, such as product, customer, region or date.","Check the underlying grain and aggregation rules."],
    ["Infor Birst","Intermediate","Scenario","A Birst dashboard is slow. What do you check?","Reproduce the slow interaction and review filters, data volume, model joins, calculations, source/query performance, refresh state and number of visuals.","Record baseline response time and compare after each change."],
    ["Infor Birst","Interview","Communication","How do you explain a Birst dashboard project?","Explain the business question, source data, your contribution, preparation and modeling steps, KPIs, validation and how users consumed the report.","Separate your own work from team work; do not invent impact numbers."],
    ["Infor Birst","Interview","Scenario","How do you validate an executive dashboard before release?","Confirm KPI definitions and filters, reconcile totals to a trusted source, test prompts and dates, check access, and verify refresh timing with representative users.","Keep a checklist and record known limitations."],
    ["Infor Birst","Interview","Concept","How do you learn a Birst-specific feature you have not used?","Check the official documentation for your version, reproduce the behavior in a safe test space, validate the result and document the steps before applying them to production.","Do not guess feature names or claim hands-on experience you do not have."],

    ["HR & Telephonic","Beginner","Behavioral","Tell me about yourself.","Use a 45–60 second structure: education and relevant background, current role, two or three relevant skills, one genuine example, and the role you are targeting.","Keep it relevant to the job; do not recite your full life story."],
    ["HR & Telephonic","Beginner","Behavioral","Why are you looking for a job change?","Give an honest, forward-looking reason such as seeking better alignment with analytics work or growth, and connect it to the role. Avoid criticizing your employer.","Tailor it to your real circumstances."],
    ["HR & Telephonic","Beginner","Behavioral","What are your strengths?","Choose two relevant strengths and support each with a genuine example—for instance structured problem-solving or careful report validation if those reflect your work.","Specific evidence is stronger than a list of adjectives."],
    ["HR & Telephonic","Beginner","Behavioral","What is one weakness you are improving?","Choose a real but manageable development area, explain the action you are taking and share how you check progress.","Do not invent a weakness or claim you have none."],
    ["HR & Telephonic","Intermediate","Behavioral","Why should we hire you?","Connect the role's needs with your relevant skills, learning ability and evidence from real tasks or projects. Explain how you could contribute.","Customize the answer to the job description and your actual experience."],
    ["HR & Telephonic","Intermediate","Behavioral","Tell me about a mistake you made at work.","Use a real example: situation, your responsibility, what went wrong, how you fixed or escalated it, and what control you added afterward.","Show ownership without disclosing confidential information."],
    ["HR & Telephonic","Intermediate","Communication","How do you handle a question you do not know?","Acknowledge the limit honestly, explain the related concept you do know, outline how you would investigate it, and ask a clarifying question if needed.","Do not bluff; show your reasoning process."],
    ["HR & Telephonic","Beginner","Communication","How should you begin a recruiter phone call?","Greet the recruiter, confirm that it is a good time, introduce yourself briefly, and keep your resume and a quiet space ready.","Speak slowly and ask politely if you need a question repeated."],
    ["HR & Telephonic","Interview","Communication","How do you answer salary expectation questions?","Research a realistic range for the role and location, consider your experience and total compensation, then state a range or ask about the budgeted range.","Do not give a number without considering the whole offer."],
    ["HR & Telephonic","Interview","Communication","Do you have any questions for us?","Ask how success is measured, what projects the team works on, which data tools are used, and how the role works with stakeholders.","Prepare two or three useful questions."],

    ["Resume & Projects","Beginner","Communication","Walk me through your resume.","Use a selective story: education, relevant current work, core skills, one or two projects and why they fit the role. Briefly explain transitions.","Every claim must match your real resume."],
    ["Resume & Projects","Intermediate","Scenario","How should you explain a data analytics project?","Cover the business problem, users, data sources, cleaning and modeling, tools, metrics, validation, findings, your contribution and limitations.","Do not fabricate business impact or numerical results."],
    ["Resume & Projects","Intermediate","Communication","How do you explain your own contribution to a team project?","Separate tasks you owned, work you shared with teammates and the team's overall outcome. Give one concrete example of your decisions or work.","Be specific and ready for follow-up questions."],
    ["Resume & Projects","Intermediate","Scenario","What if a project on your resume is incomplete?","State what is implemented and tested, what remains, and the next steps. Do not present planned functionality as completed work.","Honesty plus a clear plan is better than an unsupported claim."],
    ["Resume & Projects","Interview","Technical","How would you describe a SQL project?","Explain the business question, tables and grain, joins, filters, aggregations or window functions, validation checks and the final insight.","Be ready to explain why every join and grouping is correct."],
    ["Resume & Projects","Interview","Technical","How would you describe a BI dashboard project?","Explain the audience, KPI definitions, data model, transformations, visuals, filters, refresh process, validation and how users act on the information.","Mention only tools and features you used or can explain confidently."],
    ["Resume & Projects","Interview","Scenario","What if an interviewer challenges your project result?","Ask which assumption they want to examine, restate the calculation and evidence, test the alternative explanation and acknowledge any limitation or correction needed.","A good analyst verifies and revises conclusions when evidence changes."],
    ["Resume & Projects","Intermediate","Communication","How do you explain a technical concept to a business stakeholder?","Start with the business question, use plain language and a relevant example, explain the implication and confirm what decision or action is needed.","Avoid unexplained acronyms."],
    ["Resume & Projects","Interview","Technical","How should you explain an inventory analytics project?","Explain the inventory question, product/location/date grain, stock and movement measures, data-quality checks, trend or exception views and limitations—only where these match your actual work.","Do not make up findings or savings."],
    ["Resume & Projects","Interview","Technical","How should you explain a budget-versus-actual report?","Define budget, actual, variance and variance percentage, specify period and currency, describe source reconciliation and explain how users investigate material deviations.","Agree how zero budgets, credits and missing values are handled."],

    ["English & Confidence","Beginner","Communication","How can you ask an interviewer to repeat a question politely?","Say: Could you please repeat the question once? I want to make sure I answer it correctly.","Clarifying a question is more professional than guessing."],
    ["English & Confidence","Beginner","Communication","How can you ask for a moment to think?","Say: Let me think through this for a moment. I would approach it in these steps... Then explain your reasoning in order.","A short pause is better than a rushed, unclear answer."],
    ["English & Confidence","Beginner","Communication","What can you say when you do not understand a technical term?","Say: I am not fully familiar with that term. Could you clarify how you are using it in this context? Then connect it to what you know.","Be honest and curious."],
    ["English & Confidence","Beginner","Communication","How do you structure a short interview answer?","Use three parts: direct answer, one reason or example, and a short conclusion. For behavioral questions, use Situation, Task, Action and Result.","Speak from key points rather than memorizing every sentence."],
    ["English & Confidence","Intermediate","Communication","How do you explain your current job in simple English?","Use this structure: My role focuses on [real responsibility]. I work with [tools you actually use] to [task]. I check results by [real validation step].","Replace every bracket with true details."],
    ["English & Confidence","Intermediate","Communication","What should you do if you become nervous?","Slow down, breathe naturally, listen to the full question, pause briefly and start with one simple sentence. Ask for clarification if needed.","Confidence improves through repeated practice."],
    ["English & Confidence","Intermediate","Communication","How can you improve an answer without memorizing it?","Remember three to five key points, explain them in different words, and practice follow-up questions instead of repeating a script.","Aim for clarity and truth, not identical wording."],
    ["English & Confidence","Beginner","Communication","How can you close a telephonic interview professionally?","Thank the interviewer, confirm next steps or an expected timeline, ask whether more information is needed, and end politely.","Stay polite and avoid assuming the outcome."],
    ["English & Confidence","Intermediate","Communication","How can you say you need clarification about a task?","Say: Could you confirm the expected output and deadline? I want to make sure I deliver the right result.","Repeat your understanding back to the person when the task is important."],
    ["English & Confidence","Interview","Communication","How do you explain a technical answer when your English is limited?","Start with a short definition, explain one step at a time, use a simple example, and check whether the interviewer wants more detail.","Clear simple English is better than complicated sentences you cannot explain."]
  ];
  // V3 curated expansion: additional role-focused questions with suggested answers, tips and follow-ups.
  const expandedRows = [
    [
        "SQL",
        "Intermediate",
        "Practical",
        "How do you return customers who have never placed an order?",
        "Use SELECT c.customer_id, c.name FROM customers c LEFT JOIN orders o ON o.customer_id=c.customer_id WHERE o.customer_id IS NULL. This keeps customers without a matching order.",
        "Test a non-nullable key from the right table; confirm the key cannot itself be NULL.",
        "What changes if an orders filter is moved from WHERE to ON?"
    ],
    [
        "SQL",
        "Intermediate",
        "Practical",
        "How do you count orders per customer while keeping customers with zero orders?",
        "Use a LEFT JOIN and GROUP BY customer: SELECT c.customer_id, COUNT(o.order_id) FROM customers c LEFT JOIN orders o ON o.customer_id=c.customer_id GROUP BY c.customer_id.",
        "COUNT(o.order_id) counts only matched orders; COUNT(*) would count the left-side row too.",
        "How would you sort customers by order count?"
    ],
    [
        "SQL",
        "Intermediate",
        "Concept",
        "What is the difference between UNION and UNION ALL?",
        "UNION combines result sets and removes duplicate rows; UNION ALL combines them without deduplicating and is often faster.",
        "Both queries need compatible column counts and types. Keep duplicates when they are meaningful.",
        "How could deduplication affect query performance?"
    ],
    [
        "SQL",
        "Intermediate",
        "Concept",
        "What is a Common Table Expression (CTE)?",
        "A CTE is a named result defined with WITH and used by the following statement. It can make complex SQL easier to read and maintain.",
        "A CTE is not automatically faster than a subquery; optimization depends on the database engine.",
        "When might a CTE improve readability?"
    ],
    [
        "SQL",
        "Intermediate",
        "Practical",
        "When would you use ROW_NUMBER instead of RANK?",
        "ROW_NUMBER assigns a unique sequential number to each row in its ordering. RANK gives tied values the same rank and leaves gaps after ties.",
        "Add a deterministic tie-breaker to ORDER BY when exactly one row should win.",
        "How does DENSE_RANK differ from RANK?"
    ],
    [
        "SQL",
        "Intermediate",
        "Practical",
        "How can you get the latest order for each customer?",
        "Use ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC, order_id DESC), then keep rn=1 in an outer query.",
        "Specify a tie-breaker so two orders on the same date do not produce an unpredictable winner.",
        "How would you return the latest two orders instead?"
    ],
    [
        "SQL",
        "Intermediate",
        "Practical",
        "How do you calculate a running sales total by date?",
        "Use SUM(amount) OVER (ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) to accumulate amounts in date order.",
        "Decide how same-day records should be ordered or grouped; frame behavior matters.",
        "How would you reset the running total for each region?"
    ],
    [
        "SQL",
        "Intermediate",
        "Concept",
        "What is a correlated subquery?",
        "A correlated subquery refers to a value from the outer query and may be evaluated conceptually for each outer row.",
        "A join or window function may be clearer or faster; compare execution plans on real data.",
        "How would you rewrite a simple correlated subquery as a join?"
    ],
    [
        "SQL",
        "Intermediate",
        "Concept",
        "What is the difference between EXISTS and IN?",
        "EXISTS checks whether a subquery returns at least one row; IN checks whether a value matches a value in a set. NULL semantics can make them behave differently.",
        "Do not assume they are always interchangeable, especially when NULLs are involved.",
        "Why can NOT IN be surprising if its subquery returns NULL?"
    ],
    [
        "SQL",
        "Intermediate",
        "Practical",
        "How do you safely handle division by zero in a SQL ratio?",
        "Use numerator * 1.0 / NULLIF(denominator, 0), then decide whether an undefined ratio should be displayed as blank or another status.",
        "Do not replace undefined ratios with zero without agreeing on the business meaning.",
        "How would you format the result as a percentage?"
    ],
    [
        "SQL",
        "Intermediate",
        "Practical",
        "How do you identify orders whose total does not match their line items?",
        "Aggregate order_items by order_id, join the aggregate to orders, and compare the computed line total with the stored order total using an agreed tolerance.",
        "Check currency, discounts, tax, returns and rounding rules before calling a mismatch an error.",
        "How would you summarize mismatches by month?"
    ],
    [
        "SQL",
        "Interview",
        "Concept",
        "What is the difference between a primary key and a foreign key?",
        "A primary key uniquely identifies a row in its table. A foreign key references a key in another table and helps enforce referential integrity.",
        "A foreign key may allow NULLs depending on its constraints; enforcement details differ by database.",
        "What happens when a referenced row is deleted?"
    ],
    [
        "SQL",
        "Intermediate",
        "Concept",
        "What is normalization in a relational database?",
        "Normalization organizes data to reduce unnecessary duplication and update anomalies by separating entities and defining relationships.",
        "Analytical models may intentionally denormalize for usability and performance.",
        "How does a star schema differ from an operational schema?"
    ],
    [
        "SQL",
        "Interview",
        "Concept",
        "What is an index and what trade-off does it introduce?",
        "An index can help the database find or order rows without scanning the whole table, but it consumes storage and adds maintenance cost to writes.",
        "Index choices depend on predicates, joins, selectivity, table size and execution plans.",
        "Why might an index not be used for a query?"
    ],
    [
        "SQL",
        "Intermediate",
        "Practical",
        "What is the purpose of EXPLAIN in SQL?",
        "EXPLAIN shows planned database operations; some systems also support execution statistics with a separate analyze option.",
        "Inspect scans, join methods, estimated rows and costly operations. Use engine-specific syntax carefully.",
        "Why be cautious with EXPLAIN ANALYZE on modifying statements?"
    ],
    [
        "SQL",
        "Intermediate",
        "Concept",
        "What is a transaction?",
        "A transaction groups database operations into a unit that can commit or roll back, helping keep related changes consistent.",
        "Understand transaction boundaries and isolation expectations for the database being used.",
        "What does rollback do?"
    ],
    [
        "SQL",
        "Intermediate",
        "Concept",
        "What does ACID stand for?",
        "Atomicity, Consistency, Isolation and Durability describe all-or-nothing changes, valid rules, controlled concurrency and persistence after commit.",
        "Explain each property with a business example, such as transferring money between accounts.",
        "Which property protects committed data after a crash?"
    ],
    [
        "SQL",
        "Intermediate",
        "Practical",
        "How do you find gaps in a sequence of IDs?",
        "Compare each ID with the previous or expected next value using LEAD/LAG, or generate the expected range and anti-join it to existing IDs.",
        "First confirm IDs are required to be gap-free; many systems legitimately have gaps.",
        "How would you find gaps in daily dates?"
    ],
    [
        "SQL",
        "Intermediate",
        "Scenario",
        "A JOIN unexpectedly doubles your sales total. What do you check?",
        "Check grain and uniqueness of join keys on both sides. A one-to-many or many-to-many match can multiply fact rows; aggregate or model the relationship correctly before joining.",
        "Compare row counts and totals before and after each join instead of applying DISTINCT blindly.",
        "How can a bridge table help with many-to-many relationships?"
    ],
    [
        "SQL",
        "Intermediate",
        "Practical",
        "How do you calculate month-over-month sales growth?",
        "Aggregate sales by month, use LAG(month_sales) OVER (ORDER BY month), then calculate (current_month - prior_month) / NULLIF(prior_month,0).",
        "Add missing months explicitly when zero-sales months matter and define behavior for a zero prior month.",
        "How do you handle the first month with no prior month?"
    ],
    [
        "SQL",
        "Interview",
        "Concept",
        "What is the difference between DELETE, TRUNCATE and DROP?",
        "DELETE removes selected rows and can use WHERE. TRUNCATE removes all rows efficiently where supported. DROP removes the database object itself.",
        "Transaction, identity-reset and permission behavior differ by database; verify the engine before making claims.",
        "Which operation preserves the table structure?"
    ],
    [
        "Excel",
        "Beginner",
        "Practical",
        "How do you lock a cell reference in an Excel formula?",
        "Use dollar signs: $A$1 locks row and column, A$1 locks row, and $A1 locks column. F4 often cycles through reference styles while editing.",
        "Check references after filling formulas down and across.",
        "When would a mixed reference be useful?"
    ],
    [
        "Excel",
        "Beginner",
        "Concept",
        "What is conditional formatting useful for?",
        "It highlights cells based on rules, such as overdue dates, duplicate values or values below a threshold.",
        "Use clear rules and a legend; too many colors can make a report harder to interpret.",
        "How would you flag duplicate IDs?"
    ],
    [
        "Excel",
        "Intermediate",
        "Practical",
        "How would you flag duplicate employee IDs without deleting rows?",
        "Use COUNTIF, such as =COUNTIF($A:$A,A2)>1, or conditional formatting. Review repeated IDs before deciding whether they are valid duplicates.",
        "Duplicate keys and duplicate full records are different data-quality issues.",
        "How can you count duplicate rows by key?"
    ],
    [
        "Excel",
        "Intermediate",
        "Practical",
        "How do you combine text from multiple columns?",
        "Use TEXTJOIN, CONCAT or the & operator. Example: =TEXTJOIN(\" \",TRUE,A2,B2) joins non-empty first and last names with a space.",
        "Choose a delimiter that matches the business need and consider extra spaces.",
        "How would you remove leading and trailing spaces?"
    ],
    [
        "Excel",
        "Intermediate",
        "Practical",
        "How do you extract a month from an Excel date?",
        "Use =MONTH(A2) for a numeric month, or =TEXT(A2,\"yyyy-mm\") for a year-month label when the source is a real date.",
        "TEXT returns text, so sort it in year-month order rather than month name alone.",
        "How do you get the first day of a month?"
    ],
    [
        "Excel",
        "Beginner",
        "Concept",
        "What is the difference between sorting and filtering?",
        "Sorting changes row order; filtering temporarily hides rows that do not meet selected criteria.",
        "Keep full records together when sorting; sorting one column alone can misalign data.",
        "How do you filter two conditions at once?"
    ],
    [
        "Excel",
        "Interview",
        "Scenario",
        "A lookup returns #N/A even though the key appears in both tables. What do you check?",
        "Check leading/trailing spaces, text-versus-number types, hidden characters, exact-match settings and whether the lookup key truly matches. Use TRIM/CLEAN or normalize types as appropriate.",
        "Do not replace every #N/A with blank until you understand whether it signals a missing reference.",
        "How might Power Query help normalize keys?"
    ],
    [
        "Excel",
        "Intermediate",
        "Concept",
        "Why use Excel Tables instead of plain cell ranges?",
        "Tables provide named columns, automatic expansion, structured references and easier filtering; formulas and PivotTable sources can be more maintainable.",
        "Verify that imported rows are included and refresh downstream summaries when needed.",
        "How do structured references improve readability?"
    ],
    [
        "Excel",
        "Intermediate",
        "Practical",
        "How do you create a dynamic dropdown list?",
        "Use Data Validation with a source range or named range; for changing lists, use an Excel Table or supported dynamic-array formula as the source.",
        "Exact source syntax can vary by Excel version; test additions to the source list.",
        "How can you prevent invalid entries?"
    ],
    [
        "Excel",
        "Intermediate",
        "Practical",
        "What does IF combined with AND or OR allow you to do?",
        "It tests multiple conditions. Example: =IF(AND(B2>=80,C2=\"Yes\"),\"Pass\",\"Review\") returns Pass only when both conditions are true.",
        "Translate the business rule into plain language before writing the formula.",
        "When should OR be used instead of AND?"
    ],
    [
        "Excel",
        "Beginner",
        "Concept",
        "What is the difference between COUNT, COUNTA and COUNTBLANK?",
        "COUNT counts numeric cells, COUNTA counts non-empty cells, and COUNTBLANK counts blank cells in a range.",
        "Text-formatted numbers and formulas returning empty strings can affect expectations.",
        "How can you count unique values in a range?"
    ],
    [
        "Excel",
        "Intermediate",
        "Practical",
        "How would you reconcile two monthly reports?",
        "Standardize keys and periods, compare totals, match records with XLOOKUP or Power Query, flag missing and mismatched records, then document tolerances and exceptions.",
        "Compare aggregate totals and row-level differences; equal grand totals can hide offsetting errors.",
        "What control total would you check first?"
    ],
    [
        "Excel",
        "Intermediate",
        "Concept",
        "What is Power Query in Excel?",
        "Power Query connects to data sources and provides repeatable steps for cleaning, shaping and combining data before loading it into Excel.",
        "Keep transformation steps understandable and verify credentials and refresh settings.",
        "How would you append files from the same folder?"
    ],
    [
        "Excel",
        "Intermediate",
        "Scenario",
        "A PivotTable shows old numbers after the source data changed. What do you do?",
        "Refresh the PivotTable, confirm the source range or table includes the new records, check filters and refresh any related connection if applicable.",
        "Refresh the source connection and PivotTable when both are required.",
        "How do you prevent new rows from being excluded?"
    ],
    [
        "Excel",
        "Interview",
        "Concept",
        "When might INDEX and MATCH be preferred over VLOOKUP?",
        "INDEX/MATCH can look left or right and does not depend on the return column position within a table array; it is supported in many older Excel versions.",
        "For newer supported Excel versions, XLOOKUP may provide a simpler alternative.",
        "What is one limitation of older lookup formulas?"
    ],
    [
        "Excel",
        "Intermediate",
        "Practical",
        "How do you calculate weighted average rather than simple average?",
        "Use =SUMPRODUCT(values,weights)/SUM(weights), after checking the weight total is nonzero and values and weights are aligned.",
        "A simple AVERAGE gives each row equal weight, which may not match the business metric.",
        "What should happen if the total weight is zero?"
    ],
    [
        "Excel",
        "Interview",
        "Scenario",
        "Your workbook is slow. How would you troubleshoot it?",
        "Look for volatile or repeated formulas, whole-column array calculations, excessive conditional formatting, external links and large unused ranges. Test one improvement at a time.",
        "Keep a backup and compare output totals after simplifying formulas.",
        "How can you check whether a change altered the output?"
    ],
    [
        "Excel",
        "Intermediate",
        "Practical",
        "How can you handle inconsistent date formats?",
        "Convert text to real dates using Text to Columns, DATEVALUE or Power Query with the correct locale, then validate ambiguous dates and apply one display format.",
        "A displayed date format does not guarantee that the underlying cell contains a real date.",
        "What issue occurs when day and month are ambiguous?"
    ],
    [
        "Excel",
        "Beginner",
        "Concept",
        "What is an Excel named range?",
        "A named range assigns a readable name to a cell or range, making formulas and validation sources easier to understand.",
        "Use meaningful names and check scope and references when debugging formulas.",
        "Where can you inspect workbook names?"
    ],
    [
        "Excel",
        "Interview",
        "Scenario",
        "A manager asks for a weekly sales summary from a raw export. What steps would you take?",
        "Check data types and duplicates, validate dates and amounts, define the week start, summarize by week and region, compare totals to the source, then show a concise chart and exceptions.",
        "Confirm how weeks start and how returns or cancellations are counted.",
        "What checks would you run before publishing?"
    ],
    [
        "Power BI",
        "Intermediate",
        "Concept",
        "What is the difference between Power Query and DAX?",
        "Power Query transforms data before load or refresh. DAX defines model calculations such as measures and calculated columns evaluated within the semantic model.",
        "Use Power Query for repeatable data shaping; use DAX for calculations that respond to report filter context.",
        "Give one example of each."
    ],
    [
        "Power BI",
        "Intermediate",
        "Concept",
        "What is filter context compared with row context?",
        "Row context refers to the current row during a row-by-row calculation. Filter context is the set of filters affecting a measure evaluation, including visuals, slicers and DAX expressions.",
        "Calculated columns and measures can behave differently because their evaluation contexts differ.",
        "Why can a measure change when a slicer changes?"
    ],
    [
        "Power BI",
        "Intermediate",
        "Practical",
        "How would you calculate total sales in DAX?",
        "A basic measure is Total Sales = SUM(Sales[Amount]). Use a measure when the total should respond dynamically to report filters.",
        "Check whether Amount is already net of returns, tax, discounts and cancellations.",
        "How would you calculate average order value?"
    ],
    [
        "Power BI",
        "Intermediate",
        "Practical",
        "How do you calculate year-over-year change in Power BI?",
        "With a continuous date table, a common pattern uses CALCULATE and SAMEPERIODLASTYEAR for prior-year sales; compare current sales with that result and use DIVIDE for percentage change.",
        "Verify date-table coverage and the business definition of year and fiscal calendar.",
        "What should you do if the prior-year value is blank or zero?"
    ],
    [
        "Power BI",
        "Intermediate",
        "Concept",
        "Why is a separate Date table useful?",
        "A date table provides consistent year, quarter, month and day attributes and supports time-intelligence calculations across multiple fact tables.",
        "Mark and relate it appropriately, and ensure the date range covers required reporting periods.",
        "How would you represent a fiscal year?"
    ],
    [
        "Power BI",
        "Intermediate",
        "Concept",
        "What is relationship cardinality?",
        "Cardinality describes how rows match across related tables, such as one-to-many, one-to-one or many-to-many.",
        "Dimension keys should normally be unique on the one side; unexpected many-to-many relationships need investigation.",
        "How could duplicate dimension keys affect totals?"
    ],
    [
        "Power BI",
        "Interview",
        "Scenario",
        "A KPI card and table show different totals. What do you investigate?",
        "Compare visual, page and report filters, measure definitions, relationships, granularity and blank handling. Recreate the calculation in a small table to isolate context differences.",
        "Document the intended KPI grain and filters before adjusting DAX.",
        "How can filter context explain the difference?"
    ],
    [
        "Power BI",
        "Intermediate",
        "Concept",
        "What is a calculated table?",
        "A calculated table is created with a DAX expression during model processing or refresh and becomes part of the model.",
        "It does not react row-by-row to report slicers the way a measure does.",
        "When might a calculated table be useful?"
    ],
    [
        "Power BI",
        "Intermediate",
        "Practical",
        "What does DIVIDE do in DAX?",
        "DIVIDE(numerator, denominator, alternateResult) performs division and lets you specify a result for a zero or blank denominator.",
        "Choose the alternate result based on the KPI definition; blank can be more accurate than zero.",
        "Why might blank be preferable to zero?"
    ],
    [
        "Power BI",
        "Interview",
        "Concept",
        "What is incremental refresh used for?",
        "Incremental refresh partitions data so refresh can process recent or changed periods rather than reloading all history, subject to source and model setup.",
        "It requires careful date filtering, policy setup and validation that historical changes are handled.",
        "What risk comes from late updates to old records?"
    ],
    [
        "Power BI",
        "Intermediate",
        "Scenario",
        "A report is slow after adding many visuals. How do you improve it?",
        "Use Performance Analyzer and model diagnostics, reduce unnecessary visuals and high-cardinality columns, simplify DAX and relationships, and test changes separately.",
        "Measure the bottleneck rather than assuming visual count is the only cause.",
        "How would you compare performance before and after a fix?"
    ],
    [
        "Power BI",
        "Intermediate",
        "Concept",
        "What is row-level security and how do you test it?",
        "RLS restricts data rows based on roles and identity. Test role assignments and effective user views with representative accounts before publishing.",
        "Model-level security is not replaced by hiding fields or visuals.",
        "How would you test two users with different access?"
    ],
    [
        "Power BI",
        "Intermediate",
        "Concept",
        "What is the difference between a report and a dashboard in Power BI Service?",
        "A report is usually a multi-page interactive exploration built on a semantic model; a dashboard is a single-page canvas in the Service that can pin tiles from reports and other sources.",
        "Distinguish Desktop authoring from Service consumption when answering.",
        "Which one usually supports report page navigation?"
    ],
    [
        "Power BI",
        "Interview",
        "Practical",
        "How would you validate a dashboard before sending it to a stakeholder?",
        "Reconcile key measures to a trusted source, test slicers and drill-through, check totals at different grains, inspect blanks and edge cases, verify security and confirm refresh timestamp.",
        "Keep a repeatable QA checklist and record expected versus actual results.",
        "How do you validate a percentage measure?"
    ],
    [
        "Power BI",
        "Intermediate",
        "Concept",
        "Why avoid bi-directional filtering by default?",
        "Bi-directional filters can create ambiguous paths and unexpected results in complex models. Single-direction dimension-to-fact filtering is often easier to reason about.",
        "Use bi-directional filtering only when the use case justifies it and you have tested outcomes.",
        "What issue can multiple filter paths cause?"
    ],
    [
        "Power BI",
        "Intermediate",
        "Concept",
        "What is a semantic model?",
        "A semantic model defines data tables, relationships, measures, metadata and security so reports can use a consistent business representation.",
        "Centralize shared metric definitions to avoid different reports calculating the same KPI differently.",
        "What belongs in a measure definition document?"
    ],
    [
        "Power BI",
        "Intermediate",
        "Practical",
        "How would you handle a many-to-many business relationship?",
        "Identify the true grain, model a bridge table or suitable mapping, define filter direction carefully and test totals for double counting.",
        "Do not force many-to-many just to make a visual render; validate business meaning.",
        "How can a bridge table change filtering?"
    ],
    [
        "Power BI",
        "Interview",
        "Scenario",
        "A scheduled refresh fails. What do you check first?",
        "Review refresh history and error, credentials, gateway availability, source reachability, schema changes, privacy levels and resource limits; rerun only after fixing the cause.",
        "Record failure time and distinguish source failure from model or credential issues.",
        "What information should an incident report include?"
    ],
    [
        "Power BI",
        "Intermediate",
        "Concept",
        "What is a disconnected table in DAX?",
        "A disconnected table has no model relationship and can provide parameter or selection values that measures read with functions like SELECTEDVALUE.",
        "It affects results through explicit DAX or other configured behavior, not normal relationship filtering.",
        "How can a disconnected table drive a metric selector?"
    ],
    [
        "Power BI",
        "Interview",
        "Scenario",
        "A sales measure is double-counted after adding a target table. Why?",
        "The target table may contain multiple rows per join key, multiplying fact rows. Verify grain, aggregate targets appropriately and model the relationship according to the intended reporting logic.",
        "Validate row counts and values at each grain before writing corrective DAX.",
        "How could you keep actuals and targets at different grains?"
    ],
    [
        "Python & Pandas",
        "Beginner",
        "Concept",
        "What is the difference between a mutable and immutable object?",
        "Mutable objects such as lists can be changed in place. Immutable objects such as strings and tuples cannot be changed in place after creation.",
        "Understand whether a function changes an existing object or returns a new one.",
        "Why can mutability matter when passing a list to a function?"
    ],
    [
        "Python & Pandas",
        "Beginner",
        "Practical",
        "How do you safely convert a string to an integer?",
        "Use int(value) after validating input, and try/except for expected invalid values. For messy data, handle blanks and non-numeric values before conversion.",
        "Do not silently convert invalid values to zero unless the business rule explicitly requires it.",
        "How would you record values that failed conversion?"
    ],
    [
        "Python & Pandas",
        "Intermediate",
        "Practical",
        "How do you find missing values in each Pandas column?",
        "Use df.isna().sum() to count missing values per column and df.isna().mean() to get the missing proportion.",
        "Inspect why values are missing before dropping or filling them.",
        "How would you compare missingness across groups?"
    ],
    [
        "Python & Pandas",
        "Intermediate",
        "Practical",
        "How do you remove repeated records by key in Pandas?",
        "Use df.drop_duplicates() for exact duplicate rows, or subset=[...] to define which columns identify duplicates.",
        "Confirm the correct business key and choose keep='first' or keep='last' intentionally.",
        "How do you list duplicates without removing them?"
    ],
    [
        "Python & Pandas",
        "Intermediate",
        "Practical",
        "How do you merge two DataFrames and check unmatched keys?",
        "Use merge with indicator=True, then inspect rows marked left_only or right_only, for example left.merge(right,on='id',how='left',indicator=True).",
        "Check key uniqueness and expected merge cardinality before trusting the result.",
        "What does an unexpected row-count increase indicate?"
    ],
    [
        "Python & Pandas",
        "Beginner",
        "Concept",
        "What is the difference between loc and iloc?",
        "loc selects by labels or boolean conditions; iloc selects by integer positions.",
        "Remember that label slices and positional slices have different endpoint behavior.",
        "Which method would you use to select rows where sales exceed 100?"
    ],
    [
        "Python & Pandas",
        "Intermediate",
        "Practical",
        "How do you group sales by region in Pandas?",
        "Use df.groupby('region', as_index=False)['sales'].sum() to return a summary table with total sales for each region.",
        "Handle missing region values explicitly if they should appear as a separate group.",
        "How would you calculate both sum and average?"
    ],
    [
        "Python & Pandas",
        "Intermediate",
        "Practical",
        "How do you convert a column to datetime?",
        "Use pd.to_datetime(df['date'], errors='coerce') and inspect values that became NaT so invalid dates can be corrected or reported.",
        "Specify a format when known and consider day/month ambiguity and timezone requirements.",
        "How would you count invalid dates after conversion?"
    ],
    [
        "Python & Pandas",
        "Intermediate",
        "Concept",
        "Why avoid chained assignment in Pandas?",
        "Chained indexing can operate on an intermediate object and may not modify the intended DataFrame reliably. Use one .loc assignment, such as df.loc[df['status']=='old','status']='current'.",
        "Make the row and column selection explicit.",
        "What should you do if you want to keep the original DataFrame unchanged?"
    ],
    [
        "Python & Pandas",
        "Intermediate",
        "Practical",
        "How can you calculate a percentage safely in Pandas?",
        "Mask zero denominators before division, for example numerator.div(denominator.where(denominator.ne(0))), and document whether undefined values remain missing.",
        "Do not automatically replace undefined ratios with zero without a business definition.",
        "How would you count zero denominators first?"
    ],
    [
        "Python & Pandas",
        "Intermediate",
        "Concept",
        "What is vectorization in Pandas?",
        "Vectorized operations apply calculations across Series or arrays without a Python loop for each row, often improving clarity and performance.",
        "Prefer built-in operations when practical, but confirm behavior around missing values and types.",
        "How would you measure whether vectorization helped?"
    ],
    [
        "Python & Pandas",
        "Intermediate",
        "Practical",
        "How do you read a large CSV in chunks?",
        "Use pd.read_csv(path, chunksize=...) and process each chunk incrementally, combining summaries or writing results as needed.",
        "Chunk processing works best when the calculation can be accumulated safely across batches.",
        "What kind of aggregation is easy to perform chunk by chunk?"
    ],
    [
        "Python & Pandas",
        "Interview",
        "Scenario",
        "A Pandas merge unexpectedly increases row count. What do you check?",
        "Check duplicate keys on each side, merge type, NULL key handling and expected relationship cardinality. Use value_counts or duplicated to inspect keys.",
        "Do not drop duplicates without understanding whether repeated keys are valid business records.",
        "How can validate='many_to_one' help in a merge?"
    ],
    [
        "Python & Pandas",
        "Intermediate",
        "Concept",
        "What is the difference between apply and vectorized operations?",
        "apply invokes a function across selected objects and can be convenient, while vectorized operations often run more efficiently using optimized array operations.",
        "Profile real workloads rather than assuming apply is always unacceptable.",
        "When might apply be clearer despite being slower?"
    ],
    [
        "Python & Pandas",
        "Beginner",
        "Practical",
        "How do you catch an expected Python error?",
        "Wrap the operation in try/except for the specific exception you expect, and handle or log the failure appropriately.",
        "Avoid a bare except that hides programming errors and makes debugging difficult.",
        "When is a finally block useful?"
    ],
    [
        "Python & Pandas",
        "Intermediate",
        "Practical",
        "How would you create a reusable data-cleaning function?",
        "Define clear input/output expectations, perform named checks and transformations, return cleaned data and validation information where useful, and test edge cases.",
        "Keep business rules explicit and avoid mutating data unexpectedly.",
        "What edge cases would you include in tests?"
    ],
    [
        "Python & Pandas",
        "Beginner",
        "Concept",
        "What is a dictionary comprehension?",
        "It constructs a dictionary from an iterable concisely, such as {name: len(name) for name in names}.",
        "Prioritize readability and avoid complex nested comprehensions when a loop is clearer.",
        "How does it differ from a list comprehension?"
    ],
    [
        "Python & Pandas",
        "Interview",
        "Scenario",
        "Your script works locally but fails on another computer. What do you investigate?",
        "Check Python and package versions, file paths, credentials/environment variables, working directory, operating-system assumptions and input data shape; document dependencies in a requirements file.",
        "Reproduce in a clean environment to separate code bugs from configuration issues.",
        "Why should secrets not be stored in the script?"
    ],
    [
        "Python & Pandas",
        "Intermediate",
        "Practical",
        "How do you validate a DataFrame before exporting a report?",
        "Check required columns, row counts, key uniqueness, missing values, expected ranges, date coverage and reconciliation totals; fail clearly when a critical rule fails.",
        "Save a summary of checks with the output so reviewers can see what was validated.",
        "What is a useful response to a failed validation check?"
    ],
    [
        "Python & Pandas",
        "Intermediate",
        "Concept",
        "What is the difference between a shallow copy and a deep copy?",
        "A shallow copy creates a new outer container but may share nested objects. A deep copy recursively copies nested objects, subject to object-specific behavior.",
        "Use copying deliberately and test whether nested values are shared.",
        "How can shared nested objects create surprising bugs?"
    ],
    [
        "Data Analysis",
        "Beginner",
        "Concept",
        "What is the difference between a metric and a KPI?",
        "A metric is a measurable quantity; a KPI is a metric selected to track progress toward an important goal.",
        "A KPI needs a clear definition, owner, target or context, and decision it supports.",
        "How do you decide whether a metric should be a KPI?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Scenario",
        "Sales fell 15% this month. How would you investigate?",
        "Validate data freshness and definitions, compare with prior periods and targets, segment by product, region, channel and customer, inspect price-volume-mix effects and seasonality, then verify likely drivers.",
        "Separate correlation from cause and quantify how much each driver explains.",
        "How would you rule out a partial-month issue?"
    ],
    [
        "Data Analysis",
        "Beginner",
        "Concept",
        "When is median more useful than mean?",
        "Median is less affected by extreme values and can better represent a skewed distribution, such as income or time-to-resolution.",
        "Choose the summary based on the distribution and the question being asked.",
        "What happens to the mean when one value becomes extremely large?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Concept",
        "What is the difference between correlation and causation?",
        "Correlation means two variables move together statistically; causation means changes in one variable produce changes in another under a supported causal design.",
        "Confounders, reverse causality and selection bias can explain correlations.",
        "What is a possible confounding variable in an ad-sales analysis?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Concept",
        "What is an outlier and how should you handle it?",
        "An outlier is unusually far from the typical data pattern. Investigate source errors, valid rare events, measurement issues and business context before deciding whether to retain, transform or exclude it.",
        "Never remove outliers solely because they look inconvenient.",
        "Which plot could help you spot outliers?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Practical",
        "How do you define conversion rate?",
        "Typically conversions divided by eligible opportunities or visitors during a defined period, multiplied by 100. The numerator, denominator, cohort and time window must be explicit.",
        "Two dashboards can disagree because they use different denominators or attribution windows.",
        "How would you define conversion for a checkout funnel?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Concept",
        "What is cohort analysis?",
        "Cohort analysis groups entities that share a starting event or period, then compares their behavior over time, such as monthly signup cohorts' retention.",
        "Compare equivalent cohort ages and define active or retained consistently.",
        "What data is needed for a monthly retention cohort?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Concept",
        "What does statistical significance mean in an A/B test?",
        "Under a test's assumptions and null hypothesis, the observed result would be sufficiently unusual according to a chosen threshold. It does not by itself measure practical importance.",
        "Check effect size, confidence interval, sample size, test design and multiple comparisons.",
        "Can a statistically significant result be too small to matter?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Concept",
        "What is a confidence interval?",
        "A confidence interval is a method-based range whose procedure has a stated long-run coverage under assumptions. It communicates uncertainty around an estimate.",
        "A 95% frequentist interval is not simply a 95% probability that the fixed parameter lies inside this already-calculated interval.",
        "How would a wider interval affect your confidence in a decision?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Concept",
        "What is selection bias?",
        "Selection bias occurs when inclusion in the analyzed sample is related to factors that distort the relationship or estimate you want to measure.",
        "Check who is absent from the data and whether the sample represents the target population.",
        "How could only surveying active customers create bias?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Practical",
        "How would you choose a chart for monthly trend data?",
        "Use a line chart for change over ordered time, with clearly labeled dates and consistent intervals. Add targets or comparison lines only when they aid interpretation.",
        "Avoid clutter and check that date gaps or partial periods are visible.",
        "When would a bar chart be more useful?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Concept",
        "How would you define customer churn?",
        "Churn must specify which customer or event qualifies as churned and the time window, such as no paid activity for a defined period or a cancellation event.",
        "Subscription, transactional and marketplace businesses require different definitions.",
        "How would you calculate monthly churn for subscriptions?"
    ],
    [
        "Data Analysis",
        "Interview",
        "Scenario",
        "Revenue rose while orders fell. What do you examine?",
        "Check average order value, product and channel mix, price changes, discounting, returns, timing and data completeness. Decompose revenue into drivers and verify calculations against finance's definition.",
        "A higher average order value can offset fewer orders, but quantify rather than assume it.",
        "How would a shift toward premium products change revenue?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Concept",
        "What is a leading indicator versus a lagging indicator?",
        "A leading indicator may signal future outcomes, while a lagging indicator records results after they occur. Their predictive value should be validated for the business context.",
        "Do not label a metric leading merely because it occurs earlier in time.",
        "What might be a leading indicator of subscription churn?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Practical",
        "How do you prioritize data-quality checks for a critical dashboard?",
        "Start with checks tied to decisions: freshness, completeness, key uniqueness, valid ranges, referential integrity and reconciliation; define severity and alert owners.",
        "Tests should fail visibly for critical issues instead of silently producing misleading numbers.",
        "Which checks would you run before sending a finance report?"
    ],
    [
        "Data Analysis",
        "Interview",
        "Concept",
        "What is Simpson's paradox?",
        "An overall trend can reverse when data is split into groups because the groups differ in size or composition.",
        "Inspect relevant segments and the data-generating process before drawing conclusions from aggregates.",
        "How could this affect comparing conversion rates between campaigns?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Scenario",
        "A KPI changed after a dashboard update. How do you isolate the cause?",
        "Freeze a known period, compare old and new definitions, data sources, transformations, filters, model relationships and refresh timestamps; reconcile each layer from raw data to visual.",
        "Change one component at a time and document the verified root cause.",
        "What baseline would you use for comparison?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Concept",
        "What is a minimum detectable effect in an experiment?",
        "It is the smallest effect an experiment is designed to detect with chosen statistical power and significance level, given assumptions about variability and sample size.",
        "It is a planning parameter, not a guarantee that smaller effects do not exist.",
        "How does sample size affect the detectable effect?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Practical",
        "How do you write a useful insight for a business stakeholder?",
        "State what changed, quantify the size and period, identify the most relevant evidence-backed driver, mention uncertainty or limitations, and recommend a clear next action.",
        "Keep observations separate from hypotheses and recommendations.",
        "What should you include if the cause is not yet confirmed?"
    ],
    [
        "Data Analysis",
        "Interview",
        "Scenario",
        "A dashboard has 30 charts but leaders do not use it. What do you do?",
        "Interview users about decisions and workflows, identify the few KPIs they need, remove redundant visuals, improve definitions and usability, then measure adoption and decision outcomes.",
        "Dashboard quality is not proportional to the number of charts.",
        "How could you measure whether the redesign worked?"
    ],
    [
        "Data Engineering",
        "Beginner",
        "Concept",
        "When would you choose ETL over ELT?",
        "ETL extracts, transforms then loads data into the target. ELT loads data first and transforms it in the target platform; real architectures may mix both patterns.",
        "Choose based on security, source/target capability, volume, latency and operational constraints.",
        "Which approach runs transformations in the destination platform?"
    ],
    [
        "Data Engineering",
        "Intermediate",
        "Concept",
        "What is a data pipeline?",
        "A data pipeline is a sequence of steps that moves and transforms data from sources to useful destinations, with dependencies, monitoring and failure handling.",
        "Design for observability, retries, data quality and clear ownership.",
        "What metrics would you monitor for a daily pipeline?"
    ],
    [
        "Data Engineering",
        "Intermediate",
        "Concept",
        "What does idempotent mean in a data pipeline?",
        "An operation is idempotent if running it repeatedly for the same input produces the same final state as running it once.",
        "Use stable keys, controlled upserts and explicit batch windows to avoid duplicate records on retries.",
        "Why is idempotency useful after a failure?"
    ],
    [
        "Data Engineering",
        "Intermediate",
        "Concept",
        "What is a data warehouse compared with a data lake?",
        "A warehouse is optimized for governed analytical data and query workloads; a lake stores diverse data flexibly, often in object storage. Lakehouse designs combine aspects of both.",
        "The terms vary by architecture; explain governance, schema and intended workloads.",
        "What kind of data might be stored in a data lake?"
    ],
    [
        "Data Engineering",
        "Intermediate",
        "Concept",
        "What is a fact table's grain?",
        "Grain states exactly what one row represents, such as one order line or one daily product-region total.",
        "Declare grain before selecting measures, keys and dimensions; mixing grains causes double counting.",
        "How can mixed grain create incorrect totals?"
    ],
    [
        "Data Engineering",
        "Intermediate",
        "Concept",
        "What is a slowly changing dimension?",
        "It manages changes to descriptive attributes over time. Type 1 overwrites values; Type 2 typically adds effective-dated rows to preserve history.",
        "Choose based on whether historical reports should reflect past or current attributes.",
        "Which type preserves prior attribute values?"
    ],
    [
        "Data Engineering",
        "Intermediate",
        "Practical",
        "How would you design a daily incremental load?",
        "Choose a reliable change marker, capture new and updated records, make the load idempotent, handle late-arriving data, reconcile counts and totals, and store a successful checkpoint only after validation.",
        "Account for deletes and updates that do not change the chosen watermark.",
        "Why should the checkpoint be updated only after a successful run?"
    ],
    [
        "Data Engineering",
        "Intermediate",
        "Concept",
        "What is a data quality contract?",
        "It defines expected properties of a dataset, such as schema, owner, freshness, valid ranges, uniqueness and acceptable null rates.",
        "Make violations observable and agree who responds to each severity level.",
        "Which contract rule would you add for a customer ID field?"
    ],
    [
        "Data Engineering",
        "Intermediate",
        "Scenario",
        "A scheduled pipeline failed halfway through. How do you recover?",
        "Inspect logs and completed steps, identify partial outputs, rerun from a safe checkpoint or rebuild the affected partition, and verify idempotency before retrying.",
        "Avoid blindly rerunning a non-idempotent process that may duplicate data.",
        "What should you validate after recovery?"
    ],
    [
        "Data Engineering",
        "Intermediate",
        "Concept",
        "Why are partitioning and clustering used in data systems?",
        "They organize data to reduce scanned data or speed up common queries, depending on the storage and query engine.",
        "Design them from workload evidence; excessive partitions or poor key choices can hurt performance.",
        "What query patterns would guide partition choice?"
    ],
    [
        "Data Engineering",
        "Interview",
        "Concept",
        "What is the difference between batch and streaming processing?",
        "Batch processes bounded groups on a schedule; streaming processes events continuously or in small increments with latency and ordering trade-offs.",
        "Define latency, delivery guarantees, late events and recovery needs before choosing.",
        "Which is more suitable for daily historical reporting?"
    ],
    [
        "Data Engineering",
        "Intermediate",
        "Concept",
        "What is schema evolution?",
        "Schema evolution manages changes such as adding, renaming or changing fields while keeping producers and consumers compatible.",
        "Prefer backward-compatible changes and validate downstream reports before deployment.",
        "What could break when a source column is renamed?"
    ],
    [
        "Data Engineering",
        "Intermediate",
        "Practical",
        "What should a data pipeline log?",
        "Log run ID, start/end time, input/output counts, checkpoints, stage duration, error details, retries and validation results without exposing credentials or sensitive values.",
        "Use structured logs and alerts that lead to action.",
        "What should never be written into a log file?"
    ],
    [
        "Data Engineering",
        "Interview",
        "Scenario",
        "A source file arrives late after a report was refreshed. What should happen?",
        "Define a late-arrival policy: detect missing expected files, alert users, backfill the affected period safely and annotate report freshness until corrected.",
        "Do not present stale values as current without a visible warning or timestamp.",
        "How can you make the backfill safe to rerun?"
    ],
    [
        "Data Engineering",
        "Intermediate",
        "Concept",
        "What is the purpose of workflow orchestration?",
        "An orchestrator schedules workflows, manages dependencies, retries, alerts and run state across tasks.",
        "A scheduler alone is not enough; workflows also need observability and failure recovery.",
        "How could a dependency failure affect downstream tasks?"
    ],
    [
        "Infor Birst",
        "Beginner",
        "Concept",
        "What is the role of spaces in Infor Birst?",
        "Birst spaces organize analytical content and can contain or expose data, metadata, reports and dashboards depending on configuration.",
        "Space design and capabilities can vary by Birst generation and tenant; verify the deployed version.",
        "What items might a user find within a space?"
    ],
    [
        "Infor Birst",
        "Intermediate",
        "Concept",
        "What is the purpose of a semantic layer in a BI platform?",
        "A semantic layer provides business-friendly measures, dimensions and relationships over underlying data structures.",
        "Centralize metric definitions and document calculation grain to reduce conflicting reports.",
        "Why should sales be defined once for all reports?"
    ],
    [
        "Infor Birst",
        "Intermediate",
        "Scenario",
        "Two Birst reports show different revenue totals. What do you check?",
        "Compare source data and refresh times, content or space differences, filters, join paths, grain, measure definitions, currency and security context; reconcile against a trusted extract.",
        "Avoid changing a shared metric until its owner and definition are confirmed.",
        "How could different date filters create a mismatch?"
    ],
    [
        "Infor Birst",
        "Intermediate",
        "Concept",
        "Why does data grain matter when modeling in Birst?",
        "Grain defines what each record represents. Combining tables at incompatible grains can duplicate measures or make aggregations misleading.",
        "Document grain, keys and expected row counts for each dataset before joining.",
        "What is one sign a join is multiplying rows?"
    ],
    [
        "Infor Birst",
        "Intermediate",
        "Practical",
        "How would you validate a Birst dashboard after a data refresh?",
        "Check job status, latest available date, row counts, key totals against a trusted source, important filters and drill paths, and access under representative roles.",
        "Record expected versus actual figures and keep a repeatable release checklist.",
        "Why is job success alone not enough?"
    ],
    [
        "Infor Birst",
        "Intermediate",
        "Concept",
        "What is the difference between data transformation and visualization?",
        "Transformation prepares and shapes data into usable structures; visualization presents measures and dimensions so users can interpret and explore results.",
        "A chart cannot reliably fix incorrect transformation logic or duplicate joins.",
        "Where would you investigate a wrong total first?"
    ],
    [
        "Infor Birst",
        "Interview",
        "Scenario",
        "A dimension value is missing from a Birst report. How do you investigate?",
        "Check the raw source row, ingestion or refresh logs, transformation and mapping logic, joins and keys, report filters, hierarchy settings and permissions.",
        "Trace the record from source through each stage instead of only editing the report.",
        "How can a mapping rule exclude a value?"
    ],
    [
        "Infor Birst",
        "Intermediate",
        "Concept",
        "Why should KPI definitions be documented in shared model logic?",
        "Documented definitions help teams use the same numerator, denominator, time grain, exclusions and aggregation rules across reports.",
        "Include an owner, purpose and effective date when definitions change.",
        "What should a KPI definition say about returns?"
    ],
    [
        "Infor Birst",
        "Intermediate",
        "Scenario",
        "A user can see a dashboard but not all expected data. What do you check?",
        "Check applied filters, data-level security, user/group permissions, assigned spaces and whether the source refresh includes the expected records.",
        "Use a test account with the user's effective permissions; do not broaden access simply to troubleshoot.",
        "Why can two users see different rows?"
    ],
    [
        "Infor Birst",
        "Intermediate",
        "Concept",
        "What is data lineage and why is it useful?",
        "Lineage describes where data originated and how it was transformed into a reported field or measure.",
        "Use lineage to explain number changes, investigate incidents and estimate downstream impact.",
        "How does lineage help when a source schema changes?"
    ],
    [
        "Infor Birst",
        "Interview",
        "Scenario",
        "A refresh succeeds but numbers are still old. What do you verify?",
        "Check the source's latest timestamp, job dependency order, downstream transformation completion, cache or report-refresh behavior, and the date selected in the report.",
        "A successful job status alone does not prove the latest expected data reached the visualization.",
        "Which timestamps would you compare?"
    ],
    [
        "Infor Birst",
        "Intermediate",
        "Practical",
        "How would you handle a request to add a new field to a Birst report?",
        "Trace the field from source through ingestion/model, confirm data type and grain, update relationships or metadata as needed, expose it safely, test filters and totals, and document dependencies.",
        "A field in the source is not automatically ready for safe reporting.",
        "What do you test if the new field is categorical?"
    ],
    [
        "HR & Telephonic",
        "Beginner",
        "Behavioral",
        "Tell me about yourself for a junior Data Analyst role.",
        "Use a 45–60 second structure: education, current relevant work, strongest tools, one real project or example, and the role you want next. Keep it factual and focused on the job.",
        "Practice the structure, not a memorized script; never add unverified metrics or responsibilities.",
        "Which two strengths are most relevant to this job?"
    ],
    [
        "HR & Telephonic",
        "Interview",
        "Behavioral",
        "Why are you considering a job change?",
        "Explain the positive direction you want, such as broader analytics work, stronger SQL/BI ownership or growth, then connect it to the role. Stay respectful about your current employer.",
        "Be honest about your reason and avoid criticizing individuals.",
        "What part of this role matches your next step?"
    ],
    [
        "HR & Telephonic",
        "Interview",
        "Behavioral",
        "What is one professional weakness you are improving?",
        "Choose a real, manageable skill and explain the practice you are doing and evidence of progress, such as structuring answers before speaking.",
        "Avoid presenting a core job requirement as permanently impossible for you.",
        "How do you track your improvement?"
    ],
    [
        "HR & Telephonic",
        "Interview",
        "Behavioral",
        "How would you reflect on a work mistake in an interview?",
        "Use a genuine example: explain the situation, impact, how you corrected it, whom you informed and what check you added to prevent recurrence.",
        "Choose a real mistake you can discuss responsibly; do not invent a story.",
        "What process change did you make afterward?"
    ],
    [
        "HR & Telephonic",
        "Interview",
        "Behavioral",
        "How do you handle feedback from a manager?",
        "Listen without interrupting, clarify the expected change, agree on a concrete action and follow up with evidence that you applied the feedback.",
        "Give a specific real example if you have one.",
        "How did you measure whether the feedback helped?"
    ],
    [
        "HR & Telephonic",
        "Interview",
        "Scenario",
        "What would you do if a deadline seems unrealistic?",
        "Clarify scope and must-have outputs, estimate remaining work and risks, propose a priority or phased delivery, and communicate early rather than silently missing the deadline.",
        "Do not promise a timeline before understanding dependencies.",
        "How would you tell the stakeholder about the risk?"
    ],
    [
        "HR & Telephonic",
        "Interview",
        "Behavioral",
        "How do you handle disagreement with a teammate?",
        "Focus on the shared goal, listen to their reasoning, compare options against evidence or requirements, and agree on a test or escalation path if needed.",
        "Avoid blame and show how you preserved the working relationship.",
        "What would you do if you still disagreed?"
    ],
    [
        "HR & Telephonic",
        "Interview",
        "Behavioral",
        "Why should we hire you for an analyst role?",
        "Connect the role's requirements to verified experience and skills, explain how you approach accuracy and communication, then give a concise relevant example.",
        "Support each claim with something you can defend in follow-up questions.",
        "Which requirement of the job can you demonstrate most strongly?"
    ],
    [
        "HR & Telephonic",
        "Interview",
        "Scenario",
        "How do you prioritize multiple reporting requests?",
        "Compare business impact, deadline, effort, dependency and risk; agree the order with stakeholders and share delivery expectations.",
        "Ask which decision is blocked rather than treating every request as equally urgent.",
        "How do you respond when two requests have the same deadline?"
    ],
    [
        "HR & Telephonic",
        "Interview",
        "Communication",
        "How do you answer a question when you do not know the answer?",
        "Acknowledge the gap, state what you do know, explain how you would verify it and avoid guessing. Ask a clarifying question to narrow the problem if useful.",
        "Interviewers value honest reasoning more than confident misinformation.",
        "What could you say if you have not used the requested tool?"
    ],
    [
        "HR & Telephonic",
        "Interview",
        "Behavioral",
        "Describe a time you worked with a non-technical stakeholder.",
        "Explain the stakeholder's need, how you clarified the request, translated it into data/reporting terms, checked the result with them and communicated limitations.",
        "Use a genuine example and be precise about your own contribution.",
        "How did you confirm that the report met their need?"
    ],
    [
        "HR & Telephonic",
        "Interview",
        "Communication",
        "What do you say when a recruiter asks about salary expectations?",
        "You can ask for the role's budget range, then share a researched realistic range based on role, location and total compensation while remaining open to the full offer.",
        "Prepare your minimum acceptable range before the call; do not state an unresearched number.",
        "What factors besides base salary matter to you?"
    ],
    [
        "HR & Telephonic",
        "Interview",
        "Communication",
        "How should you explain notice period and joining availability?",
        "State your actual notice period and any confirmed flexibility. Give a realistic earliest joining date only after checking obligations.",
        "Do not promise early release unless it is approved.",
        "What would you say if the start date is negotiable?"
    ],
    [
        "HR & Telephonic",
        "Interview",
        "Behavioral",
        "What motivates you in analytics work?",
        "Mention genuine motivators such as finding reliable insights, improving reporting consistency, solving practical business questions or making information easier to use.",
        "Connect the answer to what the job actually does.",
        "What type of data problem would you enjoy solving?"
    ],
    [
        "HR & Telephonic",
        "Interview",
        "Communication",
        "What questions would you ask the interviewer?",
        "Ask about the team's main analytics problems, data stack, success measures for the first 90 days, review process and collaboration with business stakeholders.",
        "Ask questions you genuinely need answered; avoid asking only about benefits.",
        "Which question would help you understand expectations?"
    ],
    [
        "Resume & Projects",
        "Intermediate",
        "Technical",
        "How do you explain a project in 60 seconds?",
        "Use problem, data, approach, validation and outcome: what question you answered, sources and tools used, key steps, accuracy checks and what changed or was learned.",
        "Clearly distinguish implemented work, shared team work and planned work.",
        "What follow-up question would test your individual contribution?"
    ],
    [
        "Resume & Projects",
        "Interview",
        "Technical",
        "How would you explain a Finance KPI or budget-versus-actual project?",
        "Describe the business need, budget and actuals data, KPI definitions, variance formulas, reporting views and reconciliation checks. State the exact work you personally completed.",
        "Do not invent savings, users or percentage improvements that you cannot verify.",
        "How would you calculate absolute and percentage variance?"
    ],
    [
        "Resume & Projects",
        "Interview",
        "Technical",
        "How would you explain an inventory analytics dashboard?",
        "Cover inventory grain, item/location/date dimensions, stock measures, movement or aging logic, freshness checks and the decisions the report supports.",
        "Be ready to explain how duplicate keys and late transactions could affect stock totals.",
        "Which checks would you use for negative inventory?"
    ],
    [
        "Resume & Projects",
        "Intermediate",
        "Technical",
        "How can you demonstrate SQL skill through a portfolio project?",
        "Include a documented dataset, business questions, readable queries, joins and aggregations, data-quality checks, expected outputs and a short explanation of insights.",
        "Use public or synthetic data and do not upload employer-confidential records.",
        "How would you prove your query totals are correct?"
    ],
    [
        "Resume & Projects",
        "Interview",
        "Scenario",
        "What if you have not used a tool mentioned in the job description?",
        "Be transparent about your current level, connect related skills you do have, describe how you would learn it and give an example of learning a similar tool.",
        "Never claim professional experience with a tool you have not used.",
        "How would you plan the first week of learning it?"
    ],
    [
        "Resume & Projects",
        "Interview",
        "Technical",
        "How do you validate a number in a dashboard project?",
        "Recompute the KPI independently from the source, compare at matching grain and filters, inspect nulls and duplicates, test edge cases and document accepted tolerances.",
        "Explain both technical checks and the business definition behind the KPI.",
        "What could cause totals to reconcile at one level but not another?"
    ],
    [
        "Resume & Projects",
        "Intermediate",
        "Scenario",
        "How would you explain a project with no quantified business impact?",
        "Describe the original problem, deliverable, quality checks, user feedback if real, and what was learned. Quantify only outcomes you measured.",
        "Do not manufacture percentages to make a resume bullet sound stronger.",
        "What evidence can you share besides revenue impact?"
    ],
    [
        "Resume & Projects",
        "Interview",
        "Technical",
        "What would you include in a project README?",
        "Add purpose, data source and license, setup instructions, project structure, analytical questions, methods, screenshots or sample outputs, validation and limitations.",
        "Make sure a reviewer can reproduce the work without secret credentials.",
        "How do you explain the data refresh process?"
    ],
    [
        "Resume & Projects",
        "Interview",
        "Scenario",
        "An interviewer asks why your dashboard uses a particular KPI. How do you answer?",
        "Tie the KPI to a business decision, define numerator and denominator, describe the stakeholder need and discuss limitations or alternative metrics.",
        "Show that you understand business meaning, not only the visual design.",
        "How could an incorrect denominator change the interpretation?"
    ],
    [
        "Resume & Projects",
        "Intermediate",
        "Technical",
        "How should you discuss a project where teammates did some of the work?",
        "Explain the goal, identify your responsibilities specifically, mention collaboration and describe the combined outcome without claiming others' work as your own.",
        "Prepare follow-up detail about your individual contribution.",
        "What did you personally design, query or validate?"
    ],
    [
        "Resume & Projects",
        "Interview",
        "Scenario",
        "How do you respond if an interviewer finds a bug in your project?",
        "Thank them, reproduce the issue, explain your current understanding, fix or document it, add a regression test and report what changed.",
        "Do not argue against reproducible evidence; demonstrate debugging discipline.",
        "How would you prevent the same bug from returning?"
    ],
    [
        "Resume & Projects",
        "Intermediate",
        "Technical",
        "How can you show a reproducible analytics workflow?",
        "Version-control code and setup instructions, record dependencies, use consistent inputs, parameterize paths and include tests or validation queries.",
        "Do not commit sensitive data, API keys or personal information.",
        "What should a requirements.txt file contain?"
    ],
    [
        "Resume & Projects",
        "Interview",
        "Technical",
        "What business insight should a sales dashboard communicate?",
        "It should answer agreed questions such as trend versus target, regional or product contribution and key changes over time, with metric definitions and exceptions visible.",
        "The right insight depends on the stakeholder's decision and business model.",
        "How could a dashboard distinguish volume and price effects?"
    ],
    [
        "Resume & Projects",
        "Interview",
        "Scenario",
        "How would you discuss a failed approach in a project?",
        "Explain your hypothesis, what test showed it was unsuitable, how you changed direction and what you learned.",
        "Keep the account factual and emphasize evidence-based iteration.",
        "What evidence made you change the approach?"
    ],
    [
        "Resume & Projects",
        "Intermediate",
        "Technical",
        "What technical follow-ups should you prepare for each resume bullet?",
        "Prepare the data source, table grain, transformation logic, tools used, decision trade-offs, validation method, limitation and what you would improve next.",
        "Do not include a skill or claim unless you can explain it at the level written.",
        "How would you defend a metric on your resume?"
    ],
    [
        "English & Confidence",
        "Beginner",
        "Communication",
        "What is a polite phrase to ask for a question again?",
        "Say: “Could you please repeat the question?” or “Could you please rephrase that? I want to make sure I understood correctly.”",
        "Pause, listen, and repeat the key requirement in your own words if needed.",
        "How could you confirm your understanding before answering?"
    ],
    [
        "English & Confidence",
        "Beginner",
        "Communication",
        "How can you take a few seconds to think before answering?",
        "Say: “Let me think about that for a moment.” Then organize the answer as definition, example and conclusion.",
        "A short pause is professional; speaking too quickly can create confusion.",
        "How can you structure an answer with three points?"
    ],
    [
        "English & Confidence",
        "Beginner",
        "Communication",
        "How do you describe your current job in simple English?",
        "Use short sentences about your verified title, responsibilities and tools, for example: “I work as a Business Analyst Consultant. I support reporting and analysis.” Adapt every line to your real work.",
        "Only use statements that accurately describe your responsibilities.",
        "Which example from your current work can you explain clearly?"
    ],
    [
        "English & Confidence",
        "Beginner",
        "Communication",
        "What can you say if you need to correct your previous answer?",
        "Say: “I would like to correct one point in my previous answer.” Then state the corrected information clearly and briefly.",
        "Correcting yourself calmly is better than leaving a known mistake unaddressed.",
        "How can you explain what you misunderstood?"
    ],
    [
        "English & Confidence",
        "Beginner",
        "Communication",
        "How can you explain SQL in simple English?",
        "“SQL is a language used to retrieve and analyze data stored in relational databases. Queries can filter, join and summarize data.” Adjust the detail to your actual skill level.",
        "Speak slowly and add a small example if asked.",
        "How would you explain a JOIN in one sentence?"
    ],
    [
        "English & Confidence",
        "Beginner",
        "Communication",
        "How do you ask a stakeholder to clarify a vague report request?",
        "Say: “Could you confirm the audience, required metrics, date range and deadline? I want to make sure the report answers the right question.”",
        "Clarification at the start prevents rework later.",
        "How would you summarize the confirmed requirements back to them?"
    ],
    [
        "English & Confidence",
        "Beginner",
        "Communication",
        "How can you explain that you need to verify a number?",
        "Say: “I do not want to give you an unverified figure. I will reconcile it with the source and confirm the result.”",
        "Give a realistic follow-up time only when you know what checking is required.",
        "What would you check before confirming the result?"
    ],
    [
        "English & Confidence",
        "Beginner",
        "Communication",
        "What is a simple structure for answering a behavioral question in English?",
        "Use STAR: Situation, Task, Action and Result. Keep each part short and make your own action clear.",
        "Use real experiences; do not memorize a fabricated story.",
        "Which part of STAR explains what you personally did?"
    ],
    [
        "English & Confidence",
        "Beginner",
        "Communication",
        "How do you explain a technical term when the interviewer looks confused?",
        "Replace jargon with a plain definition, use a small example and ask whether the explanation answers the question.",
        "Clear communication means adapting to the listener, not showing off vocabulary.",
        "How would you explain a KPI to a non-technical manager?"
    ],
    [
        "English & Confidence",
        "Beginner",
        "Communication",
        "What should you do when you become nervous during a phone interview?",
        "Pause, take one slow breath, listen for the main request, and answer in two or three short points. Ask for clarification if needed.",
        "Keep a short list of keywords nearby instead of reading a full script.",
        "What sentence can help you restart if you lose your train of thought?"
    ],
    [
        "Business Analyst & Requirements",
        "Beginner",
        "Concept",
        "What is a user story?",
        "A user story is a brief requirement from the user's perspective, often written “As a [user], I want [capability], so that [benefit].”",
        "The story should be testable and supported by acceptance criteria.",
        "Write one user story for a sales dashboard."
    ],
    [
        "Business Analyst & Requirements",
        "Intermediate",
        "Concept",
        "What are acceptance criteria?",
        "Acceptance criteria define observable conditions that a requirement must satisfy to be considered complete.",
        "Use specific, testable statements and clarify edge cases with the stakeholder.",
        "How could you test whether a filter requirement is satisfied?"
    ],
    [
        "Business Analyst & Requirements",
        "Intermediate",
        "Concept",
        "What is the difference between a business requirement and a functional requirement?",
        "A business requirement states the outcome the organization wants. A functional requirement describes behavior or capability the solution must provide to meet that need.",
        "Keep requirements traceable to the business objective.",
        "Give an example of a functional requirement for a report."
    ],
    [
        "Business Analyst & Requirements",
        "Intermediate",
        "Practical",
        "How do you gather requirements for a new dashboard?",
        "Identify users and decisions, interview stakeholders, define KPIs and filters, inspect current reports/data, document assumptions and exceptions, then confirm a prototype and acceptance criteria.",
        "Do not start building based only on a vague request like “show everything.”",
        "What would you ask before defining the first KPI?"
    ],
    [
        "Business Analyst & Requirements",
        "Intermediate",
        "Concept",
        "What is a process flow diagram used for?",
        "It maps steps, decisions, actors and handoffs so teams can understand current behavior and identify gaps or improvement opportunities.",
        "Validate the diagram with people who perform the real process.",
        "What could a decision diamond represent?"
    ],
    [
        "Business Analyst & Requirements",
        "Interview",
        "Scenario",
        "Two stakeholders request conflicting KPI definitions. What do you do?",
        "Document each definition and its purpose, identify the impact, facilitate a decision with the metric owner, and record the approved definition.",
        "Do not silently choose one version or create two unlabeled metrics.",
        "How would you communicate the final decision to both stakeholders?"
    ],
    [
        "Business Analyst & Requirements",
        "Intermediate",
        "Concept",
        "What is requirements traceability?",
        "Traceability links requirements to their source, design, implementation and test evidence so teams can understand coverage and change impact.",
        "Keep links current as scope changes.",
        "How does traceability help during a change request?"
    ],
    [
        "Business Analyst & Requirements",
        "Intermediate",
        "Scenario",
        "A stakeholder changes requirements close to delivery. How do you respond?",
        "Clarify the reason and urgency, assess impact on scope, timing and testing, present trade-offs, obtain agreement and update the backlog or specification.",
        "Make the impact visible; avoid accepting hidden work without reprioritization.",
        "Which risks should be documented before agreeing?"
    ],
    [
        "Business Analyst & Requirements",
        "Intermediate",
        "Concept",
        "What is the difference between As-Is and To-Be process analysis?",
        "As-Is describes how work happens today; To-Be describes the intended future process after changes.",
        "Base both on validated evidence and include exceptions, not just the ideal path.",
        "Why is it useful to document the current process first?"
    ],
    [
        "Business Analyst & Requirements",
        "Interview",
        "Scenario",
        "How do you decide whether a requirement is ready for development?",
        "Check that it is understood and prioritized, testable, has acceptance criteria, identifies relevant data/security needs and resolves critical dependencies.",
        "A checklist helps expose unknowns before work begins.",
        "Who should approve acceptance criteria?"
    ],
    [
        "MIS & Reporting",
        "Beginner",
        "Concept",
        "What is an MIS report?",
        "An MIS report organizes operational or management information in a consistent format to monitor performance and support decisions.",
        "Start from the audience and decision, then determine frequency, measures and detail.",
        "What should a daily sales MIS show?"
    ],
    [
        "MIS & Reporting",
        "Intermediate",
        "Scenario",
        "How do you ensure a daily MIS report is accurate?",
        "Validate source freshness, required fields, duplicates, date range and totals; reconcile against a trusted report, review exceptions and keep a timestamp and version record.",
        "Use the same repeatable checks each day and escalate critical discrepancies.",
        "How would you investigate a variance against yesterday's report?"
    ],
    [
        "MIS & Reporting",
        "Intermediate",
        "Practical",
        "How do you combine reports from multiple branches?",
        "Standardize column names and data types, append compatible datasets, add source/branch identifiers, validate row counts and totals, and investigate schema differences.",
        "Do not append before checking whether columns represent the same business meaning.",
        "How can you flag a branch that did not submit data?"
    ],
    [
        "MIS & Reporting",
        "Intermediate",
        "Concept",
        "What is the difference between daily, weekly and monthly reporting cadence?",
        "Each cadence supports different decisions: daily operational action, weekly patterns and short-term control, and monthly performance review. Cutoff and completeness rules must be clear.",
        "A monthly report should not compare partial periods as if they were complete.",
        "Why should the report period be displayed?"
    ],
    [
        "MIS & Reporting",
        "Intermediate",
        "Scenario",
        "A manager asks why this month's report differs from last month's file. What do you compare?",
        "Compare source snapshots, cutoff dates, filters, formulas, mapping tables, corrections and refresh timestamps; reconcile changed rows and document the explanation.",
        "Distinguish real business movement from late-arriving or corrected data.",
        "What is a control total you would check first?"
    ],
    [
        "MIS & Reporting",
        "Intermediate",
        "Concept",
        "What is a control total?",
        "A control total is an independent total, count or balance used to check that data moved or transformed correctly between systems or process stages.",
        "Use more than one control when a matching grand total could hide offsetting errors.",
        "What other control could supplement a monetary total?"
    ],
    [
        "MIS & Reporting",
        "Interview",
        "Practical",
        "How can you reduce manual effort in a recurring report?",
        "Standardize the input template, use repeatable formulas or Power Query, automate refresh where approved, add validation checks and document exceptions and ownership.",
        "Automate only after current business rules are understood and tested.",
        "How would you confirm an automated report matches the old process?"
    ],
    [
        "MIS & Reporting",
        "Intermediate",
        "Scenario",
        "A branch submitted incomplete data before the report deadline. What do you do?",
        "Identify missing fields and impact, contact the owner, apply the agreed cutoff policy, label provisional or excluded records and update the report if a controlled late submission is accepted.",
        "Do not silently fill critical missing values with guesses.",
        "How would you communicate a provisional figure?"
    ],
    [
        "MIS & Reporting",
        "Intermediate",
        "Concept",
        "Why should a report include a refresh timestamp?",
        "It helps users judge data freshness and avoid acting on stale information, especially when sources update at different times.",
        "Clarify timezone and whether it means extract, model refresh or report publication.",
        "How is a data timestamp different from a publish timestamp?"
    ],
    [
        "MIS & Reporting",
        "Interview",
        "Scenario",
        "How would you handle a last-minute request outside the standard MIS pack?",
        "Clarify the decision, scope and deadline, assess data availability and validation effort, agree a safe minimum deliverable, and log recurring needs for future standardization.",
        "Do not sacrifice essential validation without telling the stakeholder.",
        "What would you do if the data is not trustworthy by the deadline?"
    ],
    [
        "Data Modeling & Warehousing",
        "Intermediate",
        "Concept",
        "What is the difference between a fact table and a dimension table?",
        "A fact table stores events or measurable observations at a declared grain; dimension tables provide descriptive context such as product, customer, region or date.",
        "Keep dimension keys unique and measures additive at the declared grain.",
        "What columns might belong in a sales fact table?"
    ],
    [
        "Data Modeling & Warehousing",
        "Intermediate",
        "Concept",
        "What is a surrogate key?",
        "A surrogate key is a generated identifier used to identify a row independently of its business attributes, often in a warehouse dimension.",
        "Keep a mapping to the business key and plan for duplicate or late-arriving source records.",
        "How can surrogate keys help retain history?"
    ],
    [
        "Data Modeling & Warehousing",
        "Intermediate",
        "Scenario",
        "Why might warehouse totals differ from operational system totals?",
        "Check timing and snapshot differences, late transactions, status filters, currency and tax definitions, duplicate handling, reversals and different transaction grains.",
        "Agree on a reconciliation boundary and make each exclusion explicit.",
        "How would you explain a timing difference to a stakeholder?"
    ],
    [
        "Data Modeling & Warehousing",
        "Intermediate",
        "Concept",
        "What does data lineage tell an analyst?",
        "It shows the path from source data through transformations and models to the fields, metrics or reports that use it.",
        "Lineage is useful for impact analysis when a source column or business rule changes.",
        "How can lineage reduce incident investigation time?"
    ],
    [
        "Data Modeling & Warehousing",
        "Interview",
        "Concept",
        "What is the advantage of a surrogate key in a slowly changing dimension?",
        "It lets each historical version of a business entity have a distinct warehouse row while preserving the business key for matching source records.",
        "The fact-table lookup must select the correct effective-dated dimension version.",
        "How does a Type 2 dimension preserve historical reporting?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Concept",
        "What is the difference between descriptive and diagnostic analytics?",
        "Descriptive analytics summarizes what happened; diagnostic analytics investigates why it happened using segmentation, comparisons and evidence.",
        "Avoid claiming a root cause until the available evidence supports it.",
        "What would you check after seeing a 10% drop in orders?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Concept",
        "What is a denominator problem in KPI reporting?",
        "A denominator problem occurs when the population or eligible records used for a rate is inconsistent, incomplete or different from what users assume.",
        "Always document who is included, excluded and the time window.",
        "How could denominator changes make conversion look better without more sales?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Practical",
        "How do you compare actual performance with a target?",
        "Calculate absolute variance (actual minus target) and, where meaningful, percentage variance using a clearly defined denominator; segment the gap to find drivers.",
        "Clarify whether favorable variance has different meaning for costs and revenue.",
        "How would you explain a negative cost variance?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Scenario",
        "A dashboard shows a sudden spike in customers. What do you check?",
        "Verify source freshness and duplicate ingestion, compare definitions and time zones, segment the spike by source/channel, and check whether a product or business event explains it.",
        "Validate instrumentation and data quality before announcing a business trend.",
        "What evidence would help distinguish a real spike from double-counting?"
    ],
    [
        "Data Analysis",
        "Intermediate",
        "Concept",
        "Why should an analyst define a metric's grain?",
        "Grain specifies the level of detail represented in a metric, such as per order, customer or day. Comparing incompatible grains can lead to double counting or misleading averages.",
        "State the unit of analysis before aggregating or joining datasets.",
        "Why should an average order value not be averaged naively across regions?"
    ],
    [
        "Data Analysis",
        "Interview",
        "Practical",
        "How would you summarize a dataset before modeling or dashboarding?",
        "Inspect schema and types, row counts, duplicates, missingness, ranges, distributions, time coverage and relationships between key columns, then record data limitations.",
        "Summary statistics do not replace understanding how the data was collected.",
        "Which three checks would you prioritize for finance data?"
    ],
    [
        "Data Analysis",
        "Interview",
        "Scenario",
        "A stakeholder asks for a metric that cannot be calculated from the available data. What do you do?",
        "Explain the gap, clarify the desired decision, suggest a defensible proxy only if appropriate, identify additional fields or tracking needed, and label assumptions clearly.",
        "Do not present a proxy as the exact requested metric.",
        "How would you explain the limitation in a dashboard note?"
    ]
];
  rows.push(...expandedRows);

  const v31Rows = [
  [
    "SQL",
    "Beginner",
    "Practical",
    "Using employees, write a query to return only name and salary.",
    "SELECT name, salary FROM employees; returns exactly those two columns for every employee row.",
    "Select only the columns the business question needs.",
    "How would you include only employees in Delhi?"
  ],
  [
    "SQL",
    "Beginner",
    "Practical",
    "Using employees, find people whose salary is at least 60000.",
    "SELECT name, salary FROM employees WHERE salary >= 60000; filters rows before displaying them.",
    "Check whether the requirement says greater than or greater than or equal to.",
    "How would you sort the result from highest salary?"
  ],
  [
    "SQL",
    "Beginner",
    "Practical",
    "List all different cities present in employees.",
    "SELECT DISTINCT city FROM employees; returns each selected city once.",
    "DISTINCT applies to the selected column combination.",
    "How can you count the number of distinct cities?"
  ],
  [
    "SQL",
    "Beginner",
    "Practical",
    "Show the five highest-paid employees.",
    "SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 5; is a common syntax in PostgreSQL, MySQL and SQLite.",
    "Some databases use TOP or FETCH instead of LIMIT.",
    "How do you handle ties at the fifth position?"
  ],
  [
    "SQL",
    "Beginner",
    "Practical",
    "Count all rows in the employees table.",
    "SELECT COUNT(*) AS employee_count FROM employees; counts rows, including rows with NULL values in individual columns.",
    "COUNT(*) and COUNT(column) behave differently when a column is NULL.",
    "How would you count employees with a non-null department_id?"
  ],
  [
    "SQL",
    "Beginner",
    "Practical",
    "Find the average salary for all employees.",
    "SELECT AVG(salary) AS average_salary FROM employees; ignores NULL salary values.",
    "Confirm whether NULL salaries should be excluded or treated as zero.",
    "How would you round the answer to two decimal places?"
  ],
  [
    "SQL",
    "Beginner",
    "Practical",
    "Find employees whose city is Delhi or Noida.",
    "SELECT * FROM employees WHERE city IN ('Delhi', 'Noida'); is a compact alternative to two OR comparisons.",
    "Text values need quotes; be consistent about spelling and case.",
    "How do you find employees not in those two cities?"
  ],
  [
    "SQL",
    "Beginner",
    "Practical",
    "Find employees whose name starts with A.",
    "SELECT * FROM employees WHERE name LIKE 'A%'; uses % for any sequence of characters.",
    "LIKE case sensitivity differs by database/collation.",
    "How would you find names ending in a?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Count employees in each city and show the largest cities first.",
    "SELECT city, COUNT(*) AS employee_count FROM employees GROUP BY city ORDER BY employee_count DESC; groups rows by city.",
    "Aliases can often be used in ORDER BY, but syntax can vary by database.",
    "How do you keep only cities with at least two employees?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Show departments that have at least two employees.",
    "SELECT department_id, COUNT(*) AS headcount FROM employees WHERE department_id IS NOT NULL GROUP BY department_id HAVING COUNT(*) >= 2; filters groups with HAVING.",
    "WHERE filters rows; HAVING filters grouped results.",
    "What changes if NULL department_id must be treated as its own group?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Return each employee with the readable department name.",
    "SELECT e.name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id; retains employees even when no department matches.",
    "Use a LEFT JOIN when unmatched employee rows must remain.",
    "How could you find only employees without a matched department?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "List customers who have never placed an order.",
    "SELECT c.customer_id, c.customer_name FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id); returns customers without a match.",
    "NOT EXISTS avoids multiplying customer rows when many orders exist.",
    "How would you do this with a LEFT JOIN?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Show each customer and total value of their paid orders, including customers with none.",
    "SELECT c.customer_id, c.customer_name, COALESCE(SUM(CASE WHEN o.status = 'Paid' THEN o.amount ELSE 0 END), 0) AS paid_total FROM customers c LEFT JOIN orders o ON o.customer_id = c.customer_id GROUP BY c.customer_id, c.customer_name; includes customers with zero paid amount.",
    "Filter paid amounts inside CASE if all customers must remain in output.",
    "Why can putting o.status='Paid' in WHERE remove customers with no orders?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Find duplicate email values in a users table.",
    "SELECT email, COUNT(*) AS occurrences FROM users WHERE email IS NOT NULL GROUP BY email HAVING COUNT(*) > 1; identifies non-null duplicates.",
    "Define whether case and spaces should be normalized before comparing emails.",
    "How would you return every full user row belonging to a duplicate email?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Find salary values shared by more than one employee.",
    "SELECT salary, COUNT(*) AS employee_count FROM employees GROUP BY salary HAVING COUNT(*) > 1; lists repeated salary values.",
    "NULL salary values may form a group; decide whether to exclude them.",
    "How would you return names of those employees too?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Find the second-highest distinct salary from employees.",
    "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees); returns the largest salary below the maximum.",
    "The result is NULL if no second distinct salary exists.",
    "How would DENSE_RANK solve this?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Create a salary label: High for 70000 or more, Mid for 50000 or more, otherwise Low.",
    "SELECT name, salary, CASE WHEN salary >= 70000 THEN 'High' WHEN salary >= 50000 THEN 'Mid' ELSE 'Low' END AS salary_band FROM employees; tests conditions in order.",
    "Put the most restrictive condition first.",
    "How would NULL salary be labelled separately?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Show orders above 1000 that are not cancelled.",
    "SELECT * FROM orders WHERE amount > 1000 AND status <> 'Cancelled'; combines conditions with AND.",
    "If status can be NULL, <> 'Cancelled' will not include those rows by default.",
    "How could you include NULL status values too?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Show orders placed during October 2026.",
    "SELECT * FROM orders WHERE order_date >= '2026-10-01' AND order_date < '2026-11-01'; uses a half-open date interval.",
    "Half-open intervals work well when order_date includes a time component.",
    "Why can applying a function to order_date make index use harder?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Find departments with no employees.",
    "SELECT d.department_id, d.department_name FROM departments d LEFT JOIN employees e ON e.department_id = d.department_id WHERE e.employee_id IS NULL; keeps departments without a match.",
    "Use a NOT NULL column from the right table to detect missing matches.",
    "How would you count employees for every department, including zero?"
  ],
  [
    "SQL",
    "Intermediate",
    "Concept",
    "Why can joining orders directly to order_items inflate order totals?",
    "A single order can have several item rows, so the order amount is repeated after the join. Aggregate each table to the required grain before joining or sum line-level amounts at the correct grain.",
    "Write down one row means what before every join.",
    "How would you validate that the joined result has the intended grain?"
  ],
  [
    "SQL",
    "Intermediate",
    "Concept",
    "What is the difference between COUNT(DISTINCT customer_id) and COUNT(customer_id)?",
    "COUNT counts non-NULL customer_id values including repeats; COUNT(DISTINCT customer_id) counts unique non-NULL IDs.",
    "The DISTINCT version may cost more on large data, so use it only when needed.",
    "How do you count unique customers per month?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Calculate a running total of daily sales.",
    "SELECT sale_date, daily_sales, SUM(daily_sales) OVER (ORDER BY sale_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_sales FROM daily_sales; computes a cumulative sum.",
    "Aggregate to one row per date first if source has multiple sales per day.",
    "What changes if several rows share the same date?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Return the latest order per customer.",
    "Use ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC, order_id DESC) in a CTE, then filter rn = 1.",
    "Add a deterministic tie-breaker when dates can match.",
    "How would you return the latest three orders per customer?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Rank employees by salary within each department.",
    "DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) assigns equal salaries the same rank without gaps.",
    "Use RANK when rank gaps after ties are desired.",
    "How does ROW_NUMBER differ for tied salaries?"
  ],
  [
    "SQL",
    "Intermediate",
    "Concept",
    "When would you use a CTE instead of a nested subquery?",
    "A CTE names an intermediate result, making multi-step logic easier to read and debug. Performance depends on the database and query plan; a CTE is not automatically faster.",
    "Use meaningful names and avoid splitting a simple expression unnecessarily.",
    "How would you use two CTEs to calculate and then rank monthly sales?"
  ],
  [
    "SQL",
    "Interview",
    "Practical",
    "Calculate month-over-month sales change percentage.",
    "Aggregate sales by month first, use LAG(month_sales) OVER (ORDER BY month_start), then calculate (month_sales - previous_month_sales) * 100.0 / NULLIF(previous_month_sales, 0).",
    "Define how the first month and zero previous-month sales should be displayed.",
    "What happens when previous_month_sales is zero?"
  ],
  [
    "SQL",
    "Interview",
    "Practical",
    "Find orders whose total differs from the sum of their line items.",
    "Aggregate order_items by order_id, join that result to orders, then filter where order_total <> item_total; use a tolerance for decimal rounding if appropriate.",
    "Compare at the same currency and rounding precision.",
    "How would you handle orders with no line items?"
  ],
  [
    "SQL",
    "Interview",
    "Concept",
    "How do WHERE filters on a LEFT JOIN table affect the result?",
    "A right-table condition in WHERE can remove unmatched NULL rows and make the result behave like an inner join. Put the condition in ON when unmatched left rows must remain.",
    "Inspect the required output population before choosing ON or WHERE.",
    "Show a query that keeps all customers but only joins paid orders."
  ],
  [
    "SQL",
    "Interview",
    "Scenario",
    "A dashboard sales number doubles after you add a product dimension. How do you investigate?",
    "Check join keys for uniqueness, compare row counts before and after the join, inspect one-to-many relationships, verify data grain, and aggregate the many-side table before joining if required.",
    "Do not fix the number with DISTINCT until the cause is understood.",
    "Which reconciliation totals would you compare?"
  ],
  [
    "SQL",
    "Interview",
    "Concept",
    "What is a window frame in a window function?",
    "A window frame defines which nearby rows contribute to an aggregate for the current row, such as all prior rows through the current row for a running total.",
    "Understand the default frame for your database and specify ROWS when precise row-by-row behavior is needed.",
    "How would you calculate a three-row moving average?"
  ],
  [
    "SQL",
    "Interview",
    "Scenario",
    "A query is slow after data grows tenfold. What do you check first?",
    "Inspect EXPLAIN or the database query plan, row estimates, filters and join keys, indexes, returned row volume, unnecessary columns, and whether joins create excess rows.",
    "Measure before and after one change; do not assume an index always helps.",
    "Which write operations can an index make slower?"
  ],
  [
    "SQL",
    "Interview",
    "Concept",
    "What is the difference between a primary key and a unique constraint?",
    "A primary key identifies each row and cannot be NULL; a unique constraint prevents duplicate values, with NULL behavior depending on the database.",
    "Choose keys that match entity identity and check database-specific NULL rules.",
    "Can a table have more than one unique constraint?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Find rows where required email is missing.",
    "SELECT * FROM customers WHERE email IS NULL OR TRIM(email) = ''; checks NULL and blank text separately.",
    "Whitespace-only values should be considered during data quality checks.",
    "How would you standardize case and surrounding spaces?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Find customers with at least three orders.",
    "SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) >= 3; counts orders for each customer.",
    "Check whether cancelled orders should count as orders for this requirement.",
    "How could you include customers with zero orders?"
  ],
  [
    "SQL",
    "Interview",
    "Practical",
    "Return each customer's first order date.",
    "SELECT customer_id, MIN(order_date) AS first_order_date FROM orders GROUP BY customer_id; uses the minimum date per customer.",
    "Confirm whether test, cancelled or deleted orders should count.",
    "How do you calculate days from first order to latest order?"
  ],
  [
    "SQL",
    "Interview",
    "Practical",
    "Find products whose sales exceed the average product sales.",
    "Aggregate sales by product in a CTE, then compare each product_total with (SELECT AVG(product_total) FROM product_totals).",
    "Average product totals, not line-level transactions, if the question asks for average by product.",
    "What is the difference between average order value and average product sales?"
  ],
  [
    "SQL",
    "Interview",
    "Scenario",
    "Two source tables have the same customer ID but conflicting customer names. What do you do?",
    "Profile the conflicts, compare source ownership and timestamps, agree a survivorship rule with the business, preserve lineage, and report unresolved conflicts rather than silently choosing one.",
    "SQL can identify the conflict; the correct business rule needs context.",
    "How would you write a query to list the conflicting IDs?"
  ],
  [
    "SQL",
    "Interview",
    "Concept",
    "Why should you avoid SELECT * in a production report query?",
    "It returns unused columns, couples the query to schema changes and can move unnecessary data. Explicit columns make output and review more predictable.",
    "Explicit column lists help when upstream tables change.",
    "When might SELECT * be acceptable?"
  ],
  [
    "SQL",
    "Intermediate",
    "Practical",
    "Extract year and month from a date for monthly grouping.",
    "Use the database's date truncation or year/month functions, such as DATE_TRUNC('month', order_date) in PostgreSQL; syntax varies by database.",
    "Keep a true date key when possible instead of grouping formatted text.",
    "Why is portable SQL syntax sometimes different for date functions?"
  ],
  [
    "SQL",
    "Interview",
    "Scenario",
    "A LEFT JOIN query still removes employees with no department. How do you debug it?",
    "Check WHERE conditions that reference the department table; moving the condition into the JOIN's ON clause may retain unmatched employees.",
    "Inspect the query after every added filter.",
    "How can you test this with one employee whose department_id is NULL?"
  ],
  [
    "SQL",
    "Interview",
    "Concept",
    "What is referential integrity?",
    "It ensures relationships stay valid, commonly by requiring a foreign-key value to reference an existing primary or unique key, unless NULL is allowed.",
    "Legacy databases may not enforce every intended relationship, so validate data too.",
    "How would you find orphaned order rows if constraints are missing?"
  ],
  [
    "SQL",
    "Interview",
    "Practical",
    "Compare row counts and totals before and after a transformation.",
    "Calculate source and target row counts plus business totals such as SUM(amount), then compare by relevant slices and investigate mismatches.",
    "Global totals can hide offsetting errors; reconcile by date, status or region too.",
    "How would you design a repeatable reconciliation report?"
  ],
  [
    "SQL",
    "Intermediate",
    "Concept",
    "What does COALESCE do?",
    "COALESCE returns the first non-NULL expression from its arguments, for example COALESCE(phone, alternate_phone, 'Not provided').",
    "Do not automatically convert every NULL to zero; it changes meaning.",
    "How does COALESCE differ from NULLIF?"
  ],
  [
    "SQL",
    "Interview",
    "Scenario",
    "An INNER JOIN returns fewer rows than the left table. Is it necessarily a bug?",
    "No. INNER JOIN keeps only matching rows. Confirm that excluding unmatched left rows matches the requirement; use a LEFT JOIN to inspect unmatched records if needed.",
    "Compare distinct keys and match rates when validating joins.",
    "How would you calculate the percentage of customers with a match?"
  ],
  [
    "Excel",
    "Beginner",
    "Practical",
    "How would you flag a missing value in Excel?",
    "Use =IF(A2=\"\",\"Missing\",\"Present\") for a simple blank check, adjusting the referenced cell and rules to the workbook.",
    "Cells containing formulas that return an empty string may need special handling.",
    "How do you distinguish a truly empty cell from a formula returning an empty string?"
  ],
  [
    "Excel",
    "Beginner",
    "Concept",
    "Which Excel reference should stay fixed when a tax rate lives in cell B1?",
    "A2 changes when a formula is copied; $A$2 keeps both the column and row fixed. $A2 and A$2 lock only one dimension.",
    "Use F4 in many desktop Excel versions to cycle reference styles.",
    "When would you lock only the column?"
  ],
  [
    "Excel",
    "Intermediate",
    "Practical",
    "How do you sum sales for a region and a date range?",
    "Use SUMIFS with the sales range, region criteria and start/end date criteria, ensuring all ranges have matching dimensions.",
    "Use a start date inclusive and an end date exclusive when timestamps exist.",
    "How would you build the same logic using a PivotTable?"
  ],
  [
    "Excel",
    "Intermediate",
    "Practical",
    "How can you prevent errors when a lookup value is absent?",
    "Use XLOOKUP's if_not_found argument or wrap a lookup in IFNA/IFERROR when a fallback is appropriate.",
    "Avoid hiding every error; #REF! may signal a real workbook problem.",
    "When would IFERROR hide a problem you should investigate?"
  ],
  [
    "Excel",
    "Intermediate",
    "Concept",
    "How can you reorder worksheet records without removing non-matching rows?",
    "Sorting changes row order; filtering hides rows that do not match criteria without deleting them.",
    "Check whether hidden rows are included in your downstream totals.",
    "How can a filtered table be restored to show every row?"
  ],
  [
    "Excel",
    "Intermediate",
    "Practical",
    "How would you find duplicate IDs in a worksheet?",
    "Use Conditional Formatting to highlight duplicates or use COUNTIF on the ID column and filter values where the count is above one.",
    "Decide whether duplicates are errors or legitimate repeated transactions.",
    "How would you remove only exact duplicate rows safely?"
  ],
  [
    "Excel",
    "Interview",
    "Scenario",
    "A PivotTable does not include newly appended rows. What do you check?",
    "Confirm the source is an Excel Table or updated range, refresh the PivotTable, and verify that the added rows have matching column headers and data types.",
    "Refresh after source updates; a fixed range may exclude new rows.",
    "Why is converting a range to an Excel Table helpful?"
  ],
  [
    "Excel",
    "Intermediate",
    "Concept",
    "When is Power Query better than manual cleaning?",
    "Power Query records repeatable transformation steps for imports, type changes, trimming, splitting, merging and appending data.",
    "Keep the raw source unchanged and document significant transformation rules.",
    "Which cleaning steps would you automate first in a daily report?"
  ],
  [
    "Excel",
    "Interview",
    "Practical",
    "How would you calculate percentage variance between actual and budget?",
    "A common formula is =(Actual-Budget)/Budget, formatted as a percentage; handle zero budget separately to avoid division errors.",
    "Confirm whether positive variance means favorable or unfavorable for the metric.",
    "Why is cost variance interpretation different from revenue variance?"
  ],
  [
    "Excel",
    "Beginner",
    "Concept",
    "What does IF do?",
    "IF tests a condition and returns one result when true and another when false, such as =IF(B2>=60,\"Pass\",\"Review\").",
    "Keep nested logic readable; consider IFS or lookup tables for many bands.",
    "How would you handle three score bands?"
  ],
  [
    "Excel",
    "Intermediate",
    "Practical",
    "How can you combine first and last names while handling blanks?",
    "Use TEXTJOIN with an appropriate delimiter and ignore-empty option, or combine cells with & after cleaning missing values.",
    "Trim unwanted spaces before combining fields.",
    "How can you remove extra spaces in a name?"
  ],
  [
    "Excel",
    "Interview",
    "Concept",
    "What is conditional formatting useful for in reporting?",
    "It emphasizes patterns such as overdue tasks, negative variance, thresholds or duplicates through rules, helping reviewers spot exceptions quickly.",
    "Avoid colors alone; use labels or icons for accessibility.",
    "How would you highlight the top 10 values?"
  ],
  [
    "Excel",
    "Interview",
    "Scenario",
    "Two reports have different totals in Excel. How do you reconcile them?",
    "Align date ranges, filters, metric definitions, row grain and refresh time; compare row counts, unique keys, missing IDs, duplicates and grouped totals.",
    "Do not assume either workbook is correct until rules are aligned.",
    "What would you include in a reconciliation checklist?"
  ],
  [
    "Excel",
    "Intermediate",
    "Concept",
    "Why use structured references in Excel Tables?",
    "Structured references use column names such as Sales[Amount], are easier to read and commonly expand as table rows are added.",
    "Keep table and column names clear and consistent.",
    "How can a structured reference help a reusable report?"
  ],
  [
    "Excel",
    "Interview",
    "Practical",
    "How do you calculate a rolling seven-day total?",
    "If data is daily and sorted, use SUM over the current row and previous six rows or a date-based SUMIFS window; choose the method based on missing dates and row grain.",
    "Seven rows are not always seven calendar days.",
    "How would missing dates change the formula?"
  ],
  [
    "Excel",
    "Intermediate",
    "Concept",
    "What is data validation in Excel?",
    "Data Validation limits or guides inputs, for example a drop-down of valid statuses or a rule for values between allowed bounds.",
    "It improves entry quality but does not replace validating imported data.",
    "How can you create a drop-down for Pending, Approved and Rejected?"
  ],
  [
    "Excel",
    "Interview",
    "Scenario",
    "A workbook becomes slow with many volatile formulas. What can you do?",
    "Profile the workbook, simplify repeated calculations, avoid unnecessary volatile functions, use Tables/Power Query where suitable, and reduce formulas over entire columns when not needed.",
    "Measure workbook recalculation before making large changes.",
    "Why can OFFSET or INDIRECT affect recalculation?"
  ],
  [
    "Excel",
    "Beginner",
    "Concept",
    "Which Excel functions separately count numeric cells, populated cells and blanks?",
    "COUNT counts numeric values, COUNTA counts non-empty cells, and COUNTBLANK counts blank cells under Excel's blank-cell rules.",
    "Text numbers may behave differently from numeric cells.",
    "How would you count cells containing numeric-looking text?"
  ],
  [
    "Excel",
    "Interview",
    "Practical",
    "How would you build a daily MIS workbook that is easy to refresh?",
    "Separate raw data, transformation steps, output/report and checks; use tables or Power Query, define a stable refresh path, and show update time and reconciliation totals.",
    "Make exceptions visible rather than silently excluding them.",
    "What checks should run before the report is shared?"
  ],
  [
    "Excel",
    "Intermediate",
    "Concept",
    "When would you choose INDEX/MATCH rather than VLOOKUP?",
    "INDEX/MATCH is flexible when the return column is left of the lookup column or when a stable column-index approach is not desirable; XLOOKUP is another modern option.",
    "Choose according to Excel version compatibility and workbook maintainability.",
    "What makes XLOOKUP easier to read?"
  ],
  [
    "Power BI",
    "Beginner",
    "Concept",
    "What is the difference between a report and a dashboard in Power BI?",
    "A report can contain multiple interactive pages; a dashboard in the Power BI service is generally a single canvas of pinned tiles.",
    "The exact workflow depends on Desktop versus Service.",
    "When would a multi-page report be more useful?"
  ],
  [
    "Power BI",
    "Intermediate",
    "Concept",
    "What is the difference between a calculated column and a measure?",
    "A calculated column is evaluated per row and stored in the model; a measure is evaluated at query time in the current filter context.",
    "Use measures for aggregations that need to respond to slicers.",
    "Why can a measure show different values by visual row?"
  ],
  [
    "Power BI",
    "Intermediate",
    "Concept",
    "In DAX, how can selecting a region change a measure without changing the source rows?",
    "Filter context is the set of filters affecting a measure evaluation, coming from visuals, slicers, page/report filters and DAX expressions.",
    "Understand which filters are active before debugging a measure.",
    "How does CALCULATE change filter context?"
  ],
  [
    "Power BI",
    "Intermediate",
    "Practical",
    "How would you write a basic total sales measure?",
    "Total Sales = SUM(Sales[SalesAmount]) creates a reusable aggregate measure that responds to filters in the report.",
    "Ensure SalesAmount is numeric and table relationships are correct.",
    "How would you calculate year-to-date sales?"
  ],
  [
    "Power BI",
    "Intermediate",
    "Concept",
    "Why is a star schema often recommended?",
    "Dimension tables describe entities such as date, product and customer; a fact table records events or measurements. Clear relationships support analysis and can simplify DAX.",
    "Define fact grain before designing relationships.",
    "What could go wrong if both fact and dimension tables contain repeated keys?"
  ],
  [
    "Power BI",
    "Interview",
    "Scenario",
    "A total sales measure is too high after adding a category field. What would you inspect?",
    "Check relationship cardinality and direction, duplicate dimension keys, fact grain and whether the visual uses a field from an unexpected table.",
    "Compare a simple table visual and validate the underlying row counts.",
    "How would you test a one-to-many relationship?"
  ],
  [
    "Power BI",
    "Intermediate",
    "Concept",
    "What is Power Query used for?",
    "Power Query imports and transforms data with recorded steps, such as changing types, filtering, splitting columns, merging and appending tables.",
    "Prefer repeatable transformations to manual changes before each refresh.",
    "What is query folding?"
  ],
  [
    "Power BI",
    "Interview",
    "Concept",
    "Why is hiding a Power BI visual not a secure way to restrict data access?",
    "Row-level security restricts which rows a user can see according to roles and rules; access must be tested with representative users and role assignments.",
    "Do not treat report filters as security controls.",
    "How do you validate an RLS role?"
  ],
  [
    "Power BI",
    "Intermediate",
    "Practical",
    "How can you show sales for the previous year in DAX?",
    "With a properly related date table, a measure can use CALCULATE with SAMEPERIODLASTYEAR(Date[Date]); date-table and calendar requirements must be met.",
    "Validate fiscal calendar and incomplete-period behavior.",
    "How would you calculate YoY percentage change?"
  ],
  [
    "Power BI",
    "Interview",
    "Scenario",
    "A report refresh fails in the Service but works on Desktop. What do you check?",
    "Review gateway configuration, credentials, source reachability, privacy settings, data source paths, scheduled refresh details and the exact error message.",
    "Desktop connectivity does not prove Service credentials or gateway are configured.",
    "What information would you capture before escalating?"
  ],
  [
    "Power BI",
    "Beginner",
    "Concept",
    "Why are relationships important in a Power BI model?",
    "Relationships propagate filters between related tables so measures can aggregate at the intended level.",
    "Use key columns with compatible types and check uniqueness on the one side.",
    "What is the risk of an ambiguous relationship path?"
  ],
  [
    "Power BI",
    "Intermediate",
    "Concept",
    "What factors should guide choosing an Import model versus DirectQuery?",
    "Import stores a copy in the model and typically gives responsive interactions; DirectQuery sends queries to the source and depends more on source performance and limitations.",
    "Decide using freshness, data size, security, source capability and performance needs.",
    "Can a hybrid model use more than one storage mode?"
  ],
  [
    "Power BI",
    "Interview",
    "Practical",
    "How would you design a KPI page for a manager?",
    "Show the key outcome KPIs first, trends versus target, a small number of meaningful breakdowns and clear definitions, with filters that match decisions users need to make.",
    "Do not add visuals merely because data is available.",
    "What could be a useful guardrail KPI next to revenue growth?"
  ],
  [
    "Power BI",
    "Interview",
    "Scenario",
    "A slicer changes one visual but not another. How do you debug it?",
    "Check Edit interactions, table relationships, visual-level filters, disconnected tables and whether the measure removes filters with DAX.",
    "Test interactions with a simple measure before changing the whole model.",
    "How might REMOVEFILTERS cause this behavior?"
  ],
  [
    "Power BI",
    "Intermediate",
    "Concept",
    "What is the purpose of a dedicated date table?",
    "A date table supplies a continuous calendar and attributes such as month, quarter and fiscal period to support time intelligence and consistent date filters.",
    "Mark the date table where required and relate it to the right date key.",
    "How do you handle multiple date columns such as order date and ship date?"
  ],
  [
    "Power BI",
    "Interview",
    "Concept",
    "What are common causes of a slow Power BI report?",
    "Large or poorly designed models, high-cardinality columns, expensive DAX, inefficient visuals, source latency and unsuitable relationships can all contribute.",
    "Use performance tools and isolate the slow visual rather than guessing.",
    "What would you test first on a large table visual?"
  ],
  [
    "Power BI",
    "Intermediate",
    "Practical",
    "How do you calculate average order value?",
    "Average Order Value = DIVIDE([Total Sales], [Order Count]); define whether count includes cancelled, returned or unpaid orders.",
    "Use DIVIDE to handle a zero denominator more safely than direct division.",
    "Why could average transaction value differ from average customer value?"
  ],
  [
    "Power BI",
    "Interview",
    "Scenario",
    "A report looks correct in Desktop but users see stale numbers. What do you verify?",
    "Check published dataset/semantic model, refresh history, credentials, gateway, report connection and whether users are opening the latest workspace/app report.",
    "Capture refresh timestamps in the report when freshness is important.",
    "How would you separate a data issue from a deployment issue?"
  ],
  [
    "Power BI",
    "Intermediate",
    "Concept",
    "Why should measures have clear names and formats?",
    "Names and formats help users understand the business definition and units, reduce confusion and make model maintenance easier.",
    "Use percentage, currency and decimal formats consistently.",
    "What should a KPI tooltip explain?"
  ],
  [
    "Power BI",
    "Interview",
    "Practical",
    "How would you validate a Power BI dashboard before release?",
    "Reconcile headline totals to a trusted source, test filters and drill-through, inspect date coverage and blanks, verify RLS, review mobile layout and record refresh time.",
    "Use a test checklist and have a business owner sign off on definitions.",
    "Which checks are functional and which are data-quality checks?"
  ],
  [
    "Python & Pandas",
    "Beginner",
    "Concept",
    "What is the difference between a list and a dictionary?",
    "A list stores ordered items accessed by position; a dictionary stores key-value mappings accessed by key.",
    "Choose a dictionary when each value has a meaningful key.",
    "How would you count occurrences of values?"
  ],
  [
    "Python & Pandas",
    "Beginner",
    "Practical",
    "How do you read a CSV file into pandas?",
    "Use pd.read_csv('file.csv'), then inspect df.head(), df.shape and df.dtypes to confirm that the file was read as expected.",
    "Set encoding, date parsing and dtypes explicitly when the source requires them.",
    "How do you read only selected columns?"
  ],
  [
    "Python & Pandas",
    "Beginner",
    "Practical",
    "How do you inspect missing values by column?",
    "Use df.isna().sum() for missing-value counts per column.",
    "Also inspect missing percentages and whether blank text should be treated as missing.",
    "How would you sort columns by missing count?"
  ],
  [
    "Python & Pandas",
    "Intermediate",
    "Practical",
    "How do you remove duplicate customer records?",
    "Use df.drop_duplicates(subset=['customer_id'], keep='last') only after deciding which record should survive.",
    "Deduplicating by ID without a survivorship rule can discard valid updates.",
    "How would you keep the latest updated_at record per customer?"
  ],
  [
    "Python & Pandas",
    "Intermediate",
    "Practical",
    "How do you filter sales above 1000 for one region?",
    "Use df[(df['sales'] > 1000) & (df['region'] == 'North')]; pandas conditions need parentheses around each comparison.",
    "Use & and | for element-wise conditions, not Python's and/or.",
    "How do you filter for North or South?"
  ],
  [
    "Python & Pandas",
    "Intermediate",
    "Practical",
    "How do you group revenue by region?",
    "Use df.groupby('region', dropna=False)['revenue'].sum().reset_index() if missing regions should remain as a group.",
    "Decide how to handle missing group labels.",
    "How would you calculate both sum and average?"
  ],
  [
    "Python & Pandas",
    "Intermediate",
    "Practical",
    "How do you merge orders with a customer lookup table?",
    "Use orders.merge(customers, on='customer_id', how='left', validate='many_to_one') when each customer key should be unique in customers.",
    "The validate argument can catch unexpected key duplication.",
    "How would you list orders whose customer key did not match?"
  ],
  [
    "Python & Pandas",
    "Interview",
    "Scenario",
    "A merge doubles the number of rows. What do you check?",
    "Inspect duplicate merge keys in the lookup table, compare key uniqueness and intended grain, use merge validation, and reconcile row counts before and after merging.",
    "Many-to-many joins can be valid but should be intentional.",
    "Which pandas command helps find duplicated keys?"
  ],
  [
    "Python & Pandas",
    "Intermediate",
    "Concept",
    "When should a Pandas analyst select rows by label instead of position?",
    "loc selects by labels and label-aware slices; iloc selects by integer positions.",
    "Boolean masks are commonly used with loc for filtering.",
    "How would you select rows 0 to 4 and columns name and salary?"
  ],
  [
    "Python & Pandas",
    "Intermediate",
    "Practical",
    "How would you convert a text column to datetime safely?",
    "Use pd.to_datetime(df['date'], errors='coerce', format=...) when a known format exists; inspect values converted to NaT.",
    "Do not silently drop invalid dates without measuring their count.",
    "How would you report invalid source dates?"
  ],
  [
    "Python & Pandas",
    "Interview",
    "Concept",
    "When should you use vectorized pandas operations instead of apply?",
    "Vectorized Series/DataFrame operations usually express bulk transformations clearly and can be faster than Python row-by-row apply.",
    "Profile first; for complex logic apply may still be acceptable.",
    "How would you calculate a column difference without a row loop?"
  ],
  [
    "Python & Pandas",
    "Intermediate",
    "Practical",
    "How do you replace negative sales values with missing values for review?",
    "Use df.loc[df['sales'] < 0, 'sales'] = pd.NA only if the business rule says negative values are invalid; otherwise negative adjustments may be legitimate.",
    "Flag suspicious values before changing source meaning.",
    "How would you keep a separate audit flag for the records?"
  ],
  [
    "Python & Pandas",
    "Interview",
    "Scenario",
    "A CSV has a numeric column stored as text because of commas. What do you do?",
    "Inspect raw values, remove approved thousands separators, convert using pd.to_numeric(errors='coerce'), then report newly invalid rows before publishing results.",
    "Locale-specific decimal and thousands separators require care.",
    "How can you identify the rows that failed conversion?"
  ],
  [
    "Python & Pandas",
    "Intermediate",
    "Concept",
    "What is the difference between concat and merge?",
    "concat stacks objects along an axis; merge joins datasets based on common keys or join conditions.",
    "Appending monthly files usually uses concat; adding customer attributes usually uses merge.",
    "What validations should follow a merge?"
  ],
  [
    "Python & Pandas",
    "Interview",
    "Practical",
    "How would you calculate month-over-month revenue in pandas?",
    "Convert dates to datetime, group revenue by monthly period, sort periods, then use pct_change() on the monthly total after handling zero and missing prior months.",
    "Define calendar or fiscal month and handle zero previous values explicitly.",
    "How would you avoid division by zero in the percentage change?"
  ],
  [
    "Python & Pandas",
    "Interview",
    "Concept",
    "What is a pandas Series compared with a DataFrame?",
    "A Series is a one-dimensional labelled array; a DataFrame is a two-dimensional labelled structure with columns that can hold different types.",
    "A selected single column often returns a Series; selecting a list of columns returns a DataFrame.",
    "How do you check DataFrame dimensions?"
  ],
  [
    "Python & Pandas",
    "Intermediate",
    "Practical",
    "How do you export a cleaned DataFrame without the index?",
    "Use df.to_csv('cleaned.csv', index=False) when the DataFrame index is not a business column.",
    "Keep a raw copy or document transformations before overwriting important files.",
    "How would you export only selected columns?"
  ],
  [
    "Python & Pandas",
    "Interview",
    "Scenario",
    "A Pandas notebook runs out of memory on a large CSV. What options do you consider?",
    "Read only required columns, specify data types, process chunks with chunksize, aggregate early, or use a fit-for-purpose database or distributed engine if the data exceeds local capacity.",
    "Chunk processing only works when the task can be designed incrementally.",
    "How could you calculate counts across chunks?"
  ],
  [
    "Python & Pandas",
    "Beginner",
    "Concept",
    "How do you check column names and data types?",
    "Use df.columns, df.dtypes and df.info() to inspect schema and non-null counts.",
    "Check type inference after importing mixed-format data.",
    "How would you rename an inconsistent column?"
  ],
  [
    "Python & Pandas",
    "Interview",
    "Practical",
    "How would you create a simple data-quality summary?",
    "Calculate row counts, duplicate-key counts, missing counts, invalid ranges and unmatched foreign keys, then export a summary and sample exception rows.",
    "Report both the number and percentage of affected records.",
    "Which checks would you run before a daily KPI refresh?"
  ],
  [
    "Data Analysis",
    "Beginner",
    "Concept",
    "How should an analyst distinguish a measurement from an objective-linked KPI?",
    "A metric is a measurement; a KPI is a metric chosen to evaluate progress toward an important objective, usually with a target or decision context.",
    "Explain the business objective and target, not only the formula.",
    "Give an example of a KPI with a guardrail metric."
  ],
  [
    "Data Analysis",
    "Intermediate",
    "Concept",
    "How can two variables move together without one causing the other?",
    "Correlation describes how variables move together; causation means a change in one variable produces a change in another, which needs stronger evidence than a simple correlation.",
    "Consider confounders, timing and experimental design.",
    "How could an experiment help test a causal claim?"
  ],
  [
    "Data Analysis",
    "Interview",
    "Scenario",
    "Revenue rises but profit falls. What would you investigate?",
    "Break down revenue, volume, price, discounts, cost of goods, mix, refunds and operating expenses; compare against prior periods and segment by product, region and channel.",
    "Reconcile finance definitions and investigate composition changes.",
    "How would you separate price effect from volume effect?"
  ],
  [
    "Data Analysis",
    "Intermediate",
    "Concept",
    "How can customers who signed up in the same month be compared over time?",
    "Cohort analysis groups users or customers by a shared starting event or period and tracks later behavior, such as retention or spend over time.",
    "Use consistent cohort definitions and observation windows.",
    "How would you compare retention between signup cohorts?"
  ],
  [
    "Data Analysis",
    "Interview",
    "Concept",
    "What makes a metric an early warning signal rather than an outcome report?",
    "A leading indicator can provide an early signal of future outcomes; a lagging indicator records an outcome after it occurs, such as completed monthly revenue.",
    "A metric may be leading for one decision and weak for another.",
    "What could lead monthly subscription churn?"
  ],
  [
    "Data Analysis",
    "Intermediate",
    "Practical",
    "How would you identify an outlier in a numeric column?",
    "Inspect distributions and use a contextual method such as IQR or z-scores, then validate whether the record is an error or a legitimate rare event.",
    "Do not delete an outlier solely because it is unusual.",
    "Why might IQR be more robust than a mean-based rule?"
  ],
  [
    "Data Analysis",
    "Interview",
    "Scenario",
    "A KPI definition changes halfway through a quarter. How do you report it?",
    "Document the old and new definitions, quantify the impact if possible, annotate the change in trend reports and avoid comparing incompatible values without a bridge or restatement.",
    "Keep definitions versioned and obtain stakeholder agreement.",
    "How would you explain the break in trend to leadership?"
  ],
  [
    "Data Analysis",
    "Intermediate",
    "Concept",
    "Why might a trend reverse after data is broken into meaningful segments?",
    "An overall trend can reverse or differ from trends within subgroups because group sizes or composition differ.",
    "Segment by relevant factors before drawing conclusions from aggregates.",
    "How could channel mix change an overall conversion rate?"
  ],
  [
    "Data Analysis",
    "Interview",
    "Practical",
    "How would you design a funnel conversion analysis?",
    "Define ordered stages, the eligible population and a consistent time window; count distinct entities at each stage and calculate conversion between consecutive stages.",
    "Avoid counting the same user multiple times in one stage unless intended.",
    "How do you distinguish stage conversion from end-to-end conversion?"
  ],
  [
    "Data Analysis",
    "Interview",
    "Concept",
    "How do confidence intervals communicate uncertainty around an estimate?",
    "A confidence interval is a range produced by a method that, under repeated sampling and its assumptions, captures the true parameter at the stated rate over repeated samples.",
    "Do not interpret a 95% confidence interval as a 95% probability that this one fixed parameter is inside the computed interval in the standard frequentist framing.",
    "How does larger sample size typically affect interval width?"
  ],
  [
    "Data Analysis",
    "Intermediate",
    "Concept",
    "What is a median and when is it useful?",
    "The median is the middle value after sorting; it is less affected by extreme values than the mean and can describe skewed distributions such as income.",
    "Choose mean or median according to the distribution and business question.",
    "How could you explain a mean that is much higher than the median?"
  ],
  [
    "Data Analysis",
    "Interview",
    "Scenario",
    "A conversion rate drops after a website release. How do you diagnose it?",
    "Validate event instrumentation and denominator definitions first, then compare pre/post periods by device, channel and funnel stage; check traffic mix, seasonality and concurrent changes.",
    "Correlation with release timing is a signal, not proof of causality.",
    "What would make an A/B test appropriate?"
  ],
  [
    "Data Analysis",
    "Intermediate",
    "Concept",
    "What is sampling bias?",
    "Sampling bias occurs when how observations enter a sample makes it systematically unrepresentative of the population relevant to the question.",
    "Check who is missing from the sample and whether missingness relates to the outcome.",
    "How might only surveying active customers bias satisfaction results?"
  ],
  [
    "Data Analysis",
    "Interview",
    "Practical",
    "How would you prioritize data-quality checks?",
    "Prioritize checks by business risk: completeness, validity, uniqueness, consistency, timeliness and referential integrity for fields driving decisions or financial reporting.",
    "Tie every check to a severity threshold and owner.",
    "Which issue should block publication of a financial dashboard?"
  ],
  [
    "Data Analysis",
    "Intermediate",
    "Concept",
    "What is a weighted average?",
    "A weighted average multiplies each value by its weight, sums those products and divides by total weight; it is useful when groups have different sizes or exposure.",
    "Ensure weights represent the intended denominator and sum correctly.",
    "Why is average branch conversion not always the mean of branch rates?"
  ],
  [
    "Data Analysis",
    "Interview",
    "Scenario",
    "A stakeholder says a dashboard is wrong but provides no details. How do you respond?",
    "Ask which metric, filter, time period and expected source they are comparing; reproduce the scenario, verify definitions and trace from displayed value to source rows.",
    "Keep a clear issue log and distinguish display problems from source-data problems.",
    "What minimum information belongs in a dashboard bug report?"
  ],
  [
    "Data Analysis",
    "Intermediate",
    "Concept",
    "What is seasonality in a time series?",
    "Seasonality is a recurring pattern tied to calendar or seasonal intervals, such as weekly traffic cycles or festive sales periods.",
    "Compare equivalent periods and consider holidays and changing business days.",
    "How could seasonality mislead a month-over-month comparison?"
  ],
  [
    "Data Analysis",
    "Interview",
    "Practical",
    "How would you explain a data finding to a non-technical manager?",
    "Start with the decision-relevant takeaway, quantify the size and period, show the key evidence, describe uncertainty and propose a next action or validation step.",
    "Avoid unexplained statistical jargon and make the metric definition clear.",
    "How would you summarize a finding in two sentences?"
  ],
  [
    "Data Analysis",
    "Interview",
    "Concept",
    "What is an A/B test guardrail metric?",
    "A guardrail metric monitors unintended harm or trade-offs while evaluating a primary outcome, such as latency, refunds or complaint rate during a conversion test.",
    "Define thresholds and decision rules before reading results.",
    "Why not choose a winner from conversion alone?"
  ],
  [
    "Data Analysis",
    "Interview",
    "Practical",
    "How do you estimate the impact of a proposed process improvement?",
    "Establish a baseline, define affected volume and unit impact, model assumptions and scenarios, then validate with a pilot and track realized benefits against the baseline.",
    "Separate measured benefits from estimates and state assumptions.",
    "How would you prevent double-counting saved time and monetary savings?"
  ],
  [
    "Data Engineering",
    "Beginner",
    "Concept",
    "What is ETL compared with ELT?",
    "ETL transforms data before loading it into a target; ELT loads raw data first and transforms inside the target platform. The best choice depends on architecture and governance needs.",
    "Mention data volume, latency, cost and transformation tooling.",
    "Which pattern might suit a cloud warehouse with scalable compute?"
  ],
  [
    "Data Engineering",
    "Intermediate",
    "Concept",
    "What is idempotency in a data pipeline?",
    "An idempotent pipeline can be rerun for the same input without creating unintended duplicate or inconsistent results, often through deterministic keys, merges or partition replacement.",
    "Plan for retries and partial failures from the start.",
    "How can a daily load safely rerun for yesterday?"
  ],
  [
    "Data Engineering",
    "Intermediate",
    "Concept",
    "What is incremental loading?",
    "Incremental loading processes only new or changed data since a checkpoint, rather than reloading the entire dataset each run.",
    "Define a reliable watermark and handle late-arriving updates.",
    "Why can MAX(updated_at) alone miss records?"
  ],
  [
    "Data Engineering",
    "Interview",
    "Scenario",
    "A scheduled pipeline succeeded but the dashboard has yesterday's data. What do you check?",
    "Verify source arrival, pipeline run time, transformation dependencies, target partition/merge, semantic-model refresh, timezone assumptions and end-to-end freshness timestamps.",
    "Trace timestamps through each layer rather than rerunning everything blindly.",
    "What monitoring metric would help detect this next time?"
  ],
  [
    "Data Engineering",
    "Intermediate",
    "Concept",
    "What is a data contract?",
    "A data contract documents expectations between producers and consumers, such as schema, meanings, keys, freshness, quality thresholds and change policy.",
    "Contracts need ownership and a process for breaking changes.",
    "How should a pipeline react to an unexpected column type?"
  ],
  [
    "Data Engineering",
    "Interview",
    "Concept",
    "What are late-arriving facts?",
    "They are business events that arrive after their event time or after related dimension information is available, requiring a policy for updates, backfills or unknown members.",
    "Distinguish event time from ingestion time.",
    "How might a late order affect last month's revenue?"
  ],
  [
    "Data Engineering",
    "Intermediate",
    "Concept",
    "What is a watermark in a pipeline?",
    "A watermark records a progress boundary such as the latest processed timestamp or offset to determine what data to process next.",
    "Allow for late updates and replay where the source's arrival order is not reliable.",
    "How could you combine a watermark with overlap and deduplication?"
  ],
  [
    "Data Engineering",
    "Interview",
    "Scenario",
    "A file arrives twice and would duplicate transactions. How can the pipeline prevent it?",
    "Track file identity and run status, use stable business keys, merge or deduplicate records, and make reprocessing explicit and idempotent.",
    "A filename alone may not uniquely identify a business batch.",
    "What audit metadata would you store per load?"
  ],
  [
    "Data Engineering",
    "Intermediate",
    "Concept",
    "What is partitioning and why use it?",
    "Partitioning organizes data by a key such as date or region so queries can prune irrelevant partitions and maintenance can target smaller subsets.",
    "Too many small partitions or a skewed key can reduce performance.",
    "Which date column should be used for partitioning: event or ingestion date?"
  ],
  [
    "Data Engineering",
    "Interview",
    "Practical",
    "How would you implement basic pipeline monitoring?",
    "Capture run status, duration, input/output row counts, freshness, rejected records and error details; alert on missed schedules or quality thresholds.",
    "Monitor business outcomes, not only whether a job returned success.",
    "How would you avoid alert fatigue?"
  ],
  [
    "Data Engineering",
    "Intermediate",
    "Concept",
    "What is a dead-letter or quarantine area?",
    "It stores records that failed validation or processing for investigation and controlled replay, rather than silently discarding them.",
    "Include error reason, source batch and timestamp while protecting sensitive data.",
    "How should quarantined rows be reconciled back to source totals?"
  ],
  [
    "Data Engineering",
    "Interview",
    "Concept",
    "How should a pipeline handle a source column being added, renamed or retyped?",
    "Schema evolution is a change to fields, types or structure over time; a pipeline needs policies for compatible additions and breaking changes.",
    "Test downstream consumers when a producer changes its schema.",
    "Why can renaming a column be more breaking than adding one?"
  ],
  [
    "Data Engineering",
    "Interview",
    "Scenario",
    "A pipeline creates duplicate rows only after retries. What do you inspect?",
    "Inspect transaction boundaries, checkpoints, write mode, merge keys and whether a retry resumes or repeats already completed work.",
    "Test failure and retry behavior, not only happy-path runs.",
    "How can a temporary table and atomic swap help?"
  ],
  [
    "Data Engineering",
    "Intermediate",
    "Concept",
    "How would you choose between scheduled batch jobs and continuous event processing?",
    "Batch processes bounded collections on a schedule; streaming processes continuing events with lower-latency requirements and additional ordering, replay and state considerations.",
    "Choose latency based on the business need, not trend alone.",
    "Can a system combine streaming ingestion with batch reconciliation?"
  ],
  [
    "Data Engineering",
    "Interview",
    "Practical",
    "How would you document a data pipeline for a support handover?",
    "Document source and destination, schedule, owners, dependencies, transformations, data-quality checks, backfill/retry procedure, alerts, access needs and recovery steps.",
    "A runbook should let another person diagnose common failures without relying on the author.",
    "Which steps should be included in a backfill procedure?"
  ],
  [
    "Infor Birst",
    "Beginner",
    "Concept",
    "What should you clarify before building a report in Infor Birst?",
    "Confirm the business question, metric definitions, user audience, filters, reporting grain, source freshness and expected reconciliation totals before choosing report layout.",
    "Keep platform-specific implementation details aligned with the deployed Birst version.",
    "What would you ask when two teams define revenue differently?"
  ],
  [
    "Infor Birst",
    "Intermediate",
    "Concept",
    "Why is semantic-layer consistency useful in BI reporting?",
    "A semantic layer can centralize business names, relationships and metric logic so different reports use consistent definitions.",
    "Validate calculations against governed definitions and known totals.",
    "How would you investigate a metric that differs between two reports?"
  ],
  [
    "Infor Birst",
    "Intermediate",
    "Scenario",
    "An Infor Birst report total differs from the source system. How do you troubleshoot?",
    "Compare date range, filters, source refresh, grain, joins, aggregation rules and null handling; reconcile row counts and totals through each transformation layer.",
    "Capture the exact report, filters and timestamp so the issue is reproducible.",
    "Which control totals would you compare first?"
  ],
  [
    "Infor Birst",
    "Intermediate",
    "Concept",
    "What is the importance of defining grain in a Birst data model?",
    "Grain describes what a row represents. Correct grain prevents double counting when measures and dimensions are joined or aggregated.",
    "Document grain for facts and check key uniqueness at that grain.",
    "What happens when an order-level measure is repeated at order-line grain?"
  ],
  [
    "Infor Birst",
    "Interview",
    "Scenario",
    "A scheduled Birst report is stale. What checks should you perform?",
    "Check upstream availability, load or refresh completion, schedule settings, report filters and whether the consumer is opening the intended current report.",
    "Use logs and timestamps instead of assuming report rendering is the cause.",
    "How would you communicate a delayed refresh to users?"
  ],
  [
    "Infor Birst",
    "Intermediate",
    "Concept",
    "Why should shared metric definitions be governed?",
    "Governance provides a single agreed meaning, formula, owner, grain and refresh expectation for metrics reused across dashboards and teams.",
    "Record definition changes and assess downstream report impact.",
    "Who should approve a change to a finance KPI?"
  ],
  [
    "Infor Birst",
    "Interview",
    "Practical",
    "How would you validate a new Birst dashboard before publishing?",
    "Test filters and drill paths, reconcile headline measures, inspect missing categories and dates, verify user access and confirm performance on expected data volume.",
    "Include business users in definition and acceptance checks.",
    "What belongs in dashboard acceptance criteria?"
  ],
  [
    "Infor Birst",
    "Interview",
    "Concept",
    "How do fact and dimension concepts help organize BI data?",
    "Facts represent measurable business events at a defined grain; dimensions describe entities and attributes used to slice those facts.",
    "Avoid mixing multiple fact grains without a clear model design.",
    "Give an order fact and two possible dimensions."
  ],
  [
    "Infor Birst",
    "Intermediate",
    "Scenario",
    "A report filter produces unexpected totals. What do you examine?",
    "Confirm the filter field, relationship path, default selections, null members, aggregation behavior and whether the filter applies to the expected data population.",
    "Reproduce the issue with one small known example.",
    "How could you test a filter against a manually calculated sample?"
  ],
  [
    "Infor Birst",
    "Interview",
    "Concept",
    "How should you discuss Birst experience when you cannot recall a version-specific feature?",
    "Explain the workflow and concepts you have actually used, state the version or limitation, and verify exact feature behavior in official documentation rather than guessing.",
    "Clear boundaries are more credible than unsupported product claims.",
    "How would you approach learning an unfamiliar Birst feature?"
  ],
  [
    "HR & Telephonic",
    "Beginner",
    "Behavioral",
    "How would you introduce yourself in a 45-second recruiter call?",
    "Give your degree, current role, relevant tools, one genuine responsibility or project, and the role you are targeting in simple sentences.",
    "Aim for a clear, factual story rather than reciting every resume line.",
    "Can you explain one recent reporting task in more detail?"
  ],
  [
    "HR & Telephonic",
    "Interview",
    "Behavioral",
    "Why are you looking for a new role?",
    "Connect the move to learning, responsibility and role alignment; remain respectful about the current employer and be honest about your reason.",
    "Do not criticize colleagues or invent a career motivation you do not have.",
    "What are you hoping to learn in the next role?"
  ],
  [
    "HR & Telephonic",
    "Interview",
    "Behavioral",
    "Tell me about a mistake you made and what you learned.",
    "Choose a real, manageable example, explain the impact, your ownership, the correction and the prevention step. Do not claim a fictional incident.",
    "Keep the focus on learning and process improvement.",
    "What check did you add to prevent a repeat?"
  ],
  [
    "HR & Telephonic",
    "Beginner",
    "Communication",
    "What can you say if you do not understand an interview question?",
    "You can say: Could you please repeat or rephrase the question? I want to make sure I understand it correctly.",
    "Clarifying a question is better than answering something unrelated.",
    "How would you confirm the question in your own words?"
  ],
  [
    "HR & Telephonic",
    "Interview",
    "Behavioral",
    "How do you handle competing deadlines?",
    "Clarify priority and impact, estimate effort, communicate trade-offs early and agree on a realistic sequence with the stakeholder.",
    "Give an example only if it matches your experience.",
    "What would you do if both tasks were marked urgent?"
  ],
  [
    "HR & Telephonic",
    "Interview",
    "Behavioral",
    "How would you respond when you do not know an answer?",
    "Be transparent, explain what you do know, outline how you would investigate and avoid pretending certainty.",
    "Think aloud in a structured way when the interviewer invites it.",
    "How would you verify the answer after the interview?"
  ],
  [
    "HR & Telephonic",
    "Beginner",
    "Communication",
    "How do you end a telephonic interview professionally?",
    "Thank the interviewer, ask about the next step or timeline if appropriate, and confirm any information you need to share afterward.",
    "Keep the closing short and polite.",
    "What question can you ask about next steps?"
  ],
  [
    "HR & Telephonic",
    "Interview",
    "Behavioral",
    "Describe a time you received feedback.",
    "Use a real example: summarize the feedback, explain what you changed and describe the observed result without exaggerating.",
    "Show that you can accept useful feedback and act on it.",
    "How do you check whether your improvement worked?"
  ],
  [
    "HR & Telephonic",
    "Interview",
    "Behavioral",
    "How do you explain a shortcoming in a tool you list on your resume?",
    "Be specific about what you can do, what you have not used deeply, and how you are currently learning; do not claim expert proficiency.",
    "Accurate skill levels build trust.",
    "Which small exercise demonstrates your current skill?"
  ],
  [
    "HR & Telephonic",
    "Interview",
    "Communication",
    "What would you ask the recruiter before ending the call?",
    "Ask about the role's main responsibilities, interview stages, expected skill emphasis and next steps, choosing questions not already answered.",
    "Avoid leading only with salary before understanding the role unless it is necessary to clarify fit.",
    "How can you ask about the day-to-day work?"
  ],
  [
    "Resume & Projects",
    "Interview",
    "Behavioral",
    "How do you explain a project using Problem, Action and Result?",
    "State the business problem, your actual contribution and tools, then the measurable or observed result. If the result was not measured, say what deliverable was produced instead.",
    "Do not invent impact numbers; distinguish team output from your contribution.",
    "What evidence supports the result you described?"
  ],
  [
    "Resume & Projects",
    "Interview",
    "Scenario",
    "How would you explain a project whose data cannot be shared publicly?",
    "Describe the business context, anonymized structure, your workflow and validation methods without revealing confidential names, figures or sensitive fields.",
    "Use approved sample or synthetic data in a portfolio.",
    "How could you demonstrate the same skill with a public dataset?"
  ],
  [
    "Resume & Projects",
    "Interview",
    "Behavioral",
    "How do you describe your contribution when you worked as part of a team?",
    "Separate your own tasks from the team's overall work and explain how you collaborated, coordinated handoffs and validated the shared result.",
    "Use 'I' for your contribution and 'we' for team outcomes.",
    "Which part did you personally own?"
  ],
  [
    "Resume & Projects",
    "Interview",
    "Practical",
    "How would you demonstrate a dashboard project on GitHub?",
    "Include a clear README, problem statement, dataset source, data dictionary, transformations, metric definitions, screenshots, validation checks and known limitations.",
    "Remove credentials and sensitive source data before publishing.",
    "What test proves the headline KPI is correct?"
  ],
  [
    "Resume & Projects",
    "Interview",
    "Scenario",
    "An interviewer challenges a resume metric. How do you respond?",
    "Explain the metric's definition, baseline, time window and source; if you cannot verify it, acknowledge that and correct the statement rather than defending an unsupported number.",
    "Every resume metric should be reproducible or removed.",
    "How would you rewrite the bullet if the impact was not quantified?"
  ],
  [
    "Resume & Projects",
    "Interview",
    "Behavioral",
    "How do you explain a project that is still in progress?",
    "Explain the goal, current stage, completed work, remaining work and how success will be evaluated; do not present planned outcomes as achieved outcomes.",
    "Use a clear status and next milestone.",
    "What is the biggest remaining risk?"
  ],
  [
    "Resume & Projects",
    "Interview",
    "Practical",
    "What should you prepare for a Birst project discussion?",
    "Be ready to explain its reporting goal, source-to-report workflow, dimensions and metrics, validation, refresh expectations, users and what you personally implemented.",
    "Only discuss features you have really used and can explain.",
    "How did you validate the report numbers?"
  ],
  [
    "Resume & Projects",
    "Interview",
    "Scenario",
    "A portfolio project shows a result that cannot be reproduced. What do you improve?",
    "Add data provenance, exact transformation steps, versioned code or files, metric definitions, environment assumptions and tests so another person can repeat the result.",
    "Reproducibility is a stronger signal than a polished screenshot alone.",
    "Which inputs and expected outputs should the README include?"
  ],
  [
    "Resume & Projects",
    "Interview",
    "Behavioral",
    "How would you explain a gap in project experience honestly?",
    "State the current level, related transferable practice and a concrete learning project; avoid inventing client work or production experience.",
    "Show an actual artifact or code example when possible.",
    "What recent practice task best demonstrates your readiness?"
  ],
  [
    "Resume & Projects",
    "Interview",
    "Practical",
    "How should you prioritize projects on a junior analyst resume?",
    "Prioritize projects that match the target role, demonstrate end-to-end analysis, show validation and clear communication, and can be explained deeply in an interview.",
    "Two well-understood projects are better than many shallow or unverifiable ones.",
    "Which project best proves your SQL ability?"
  ],
  [
    "English & Confidence",
    "Beginner",
    "Communication",
    "How can you ask for a few seconds to think?",
    "Say: Let me think through this for a moment. I would start by checking the requirement and then work through the data.",
    "A short pause is natural; explain your reasoning in small steps.",
    "What first check would you do for a data mismatch?"
  ],
  [
    "English & Confidence",
    "Beginner",
    "Communication",
    "How do you explain a difficult concept in simple English?",
    "Use a short definition, one everyday analogy or example, and one sentence about when it is useful.",
    "Avoid jargon that you cannot define clearly.",
    "Can you explain a SQL join in two sentences?"
  ],
  [
    "English & Confidence",
    "Beginner",
    "Communication",
    "How do you politely disagree with an interviewer or stakeholder?",
    "Say: I see your point. I would like to check one detail because it may change the result. Then explain the evidence calmly.",
    "Focus on evidence, not on proving the other person wrong.",
    "What data would you check before concluding?"
  ],
  [
    "English & Confidence",
    "Intermediate",
    "Communication",
    "How can you structure a spoken technical answer in 30 seconds?",
    "Use Definition, Example, and Why it matters. If needed, add one limitation or follow-up check.",
    "Practice aloud with a timer but do not rush your words.",
    "Use this format to explain GROUP BY."
  ],
  [
    "English & Confidence",
    "Beginner",
    "Communication",
    "What can you say when you need to correct your own answer?",
    "Say: I want to correct one part of my answer. The more accurate explanation is... Then state the correction clearly.",
    "Self-correction is better than continuing with a mistake.",
    "How would you correct a mistaken explanation of LEFT JOIN?"
  ],
  [
    "Business Analyst & Requirements",
    "Beginner",
    "Concept",
    "What information turns a user request into a testable user story?",
    "A user story briefly describes a need from a user's perspective, often in the form: As a [user], I want [capability], so that [benefit].",
    "A story should connect to value and have testable acceptance criteria.",
    "How would you write a story for a monthly sales report?"
  ],
  [
    "Business Analyst & Requirements",
    "Intermediate",
    "Practical",
    "How do you write acceptance criteria for a new report?",
    "Define expected metrics, population, filters, date logic, freshness, permissions and reconciliation rules in testable language.",
    "Avoid vague criteria such as 'the report should look correct'.",
    "What is one measurable acceptance test?"
  ],
  [
    "Business Analyst & Requirements",
    "Interview",
    "Scenario",
    "How should an analyst document a decision after stakeholders disagree about a KPI?",
    "Document both definitions and intended decisions, show the impact of each, facilitate agreement with the metric owner and record the approved rule.",
    "Do not silently choose one definition for convenience.",
    "How would you handle a deadline before agreement is reached?"
  ],
  [
    "Business Analyst & Requirements",
    "Intermediate",
    "Concept",
    "What is the difference between a business requirement and a solution design?",
    "A business requirement describes the need or outcome; solution design describes how a system or process will meet it.",
    "Keep the problem statement separate from the proposed tool.",
    "How would you gather requirements before deciding on Power BI?"
  ],
  [
    "Business Analyst & Requirements",
    "Interview",
    "Practical",
    "How do you confirm a requirement is complete?",
    "Review purpose, users, inputs, business rules, outputs, edge cases, non-functional needs, acceptance criteria and stakeholder approval.",
    "Use examples and edge cases to reveal hidden assumptions.",
    "Which edge case would you test for a date filter?"
  ],
  [
    "MIS & Reporting",
    "Beginner",
    "Concept",
    "What should a daily MIS report include?",
    "It should include agreed KPIs, reporting period and refresh time, comparison or target where useful, exception highlights and clear definitions.",
    "Keep it action-oriented; avoid unnecessary detail that hides exceptions.",
    "What would you show when a KPI is delayed?"
  ],
  [
    "MIS & Reporting",
    "Intermediate",
    "Practical",
    "How would you reconcile reports from multiple branches?",
    "Standardize field definitions, time periods and units, combine branch data, check branch-level totals and missing submissions, then compare the grand total to an independent control.",
    "Track missing, duplicate and late branch submissions separately.",
    "How would you show a branch that did not submit data?"
  ],
  [
    "MIS & Reporting",
    "Interview",
    "Scenario",
    "A daily report is delayed because one source file is missing. What do you do?",
    "Confirm the missing dependency, alert users about the impact, publish only if an approved partial-data rule exists, and record the missing source for follow-up.",
    "Never label an incomplete report as complete.",
    "What status label and timestamp would you display?"
  ],
  [
    "MIS & Reporting",
    "Intermediate",
    "Concept",
    "What is a control total in reporting?",
    "A control total is an independent aggregate such as record count or total amount used to verify that data was transferred or transformed completely.",
    "A matching total alone cannot prove every row is correct; use multiple checks.",
    "Which control totals would help validate a bank transaction file?"
  ],
  [
    "MIS & Reporting",
    "Interview",
    "Practical",
    "How do you make a recurring report less error-prone?",
    "Automate repeatable steps, validate schema and row counts, compare totals, flag exceptions, timestamp refreshes and use a checklist before distribution.",
    "Retain an auditable copy of the source and final output according to policy.",
    "What should happen when a validation check fails?"
  ],
  [
    "Data Modeling & Warehousing",
    "Beginner",
    "Concept",
    "What is a fact table?",
    "A fact table records business events or measurements at a defined grain, such as one row per order line or transaction.",
    "State the grain before choosing measures or foreign keys.",
    "What measures might belong in an order-line fact?"
  ],
  [
    "Data Modeling & Warehousing",
    "Beginner",
    "Concept",
    "What is a dimension table?",
    "A dimension describes entities such as customer, product, date or region and provides attributes used to filter and group facts.",
    "Keep descriptive attributes at the dimension's intended grain.",
    "Which dimension would contain product category?"
  ],
  [
    "Data Modeling & Warehousing",
    "Intermediate",
    "Concept",
    "How can a warehouse identify a dimension row independently of a source-system code?",
    "A surrogate key is a generated identifier used to identify a dimension row independently of its source business key.",
    "It can help manage changed source identifiers and historical dimension versions.",
    "Why might a slowly changing dimension need multiple surrogate keys for one customer?"
  ],
  [
    "Data Modeling & Warehousing",
    "Intermediate",
    "Concept",
    "What is a slowly changing dimension Type 2?",
    "Type 2 preserves history by adding a new dimension row when tracked attributes change, usually with validity dates or current-row flags.",
    "Ensure facts map to the correct historical dimension version.",
    "How would you find the current row?"
  ],
  [
    "Data Modeling & Warehousing",
    "Interview",
    "Scenario",
    "A fact table has multiple rows per order but a report sums order total. What is the risk?",
    "If order-level total is repeated on each line, summing it at line grain double counts orders. Use the correct grain, a measure that deduplicates by order, or model order and line facts separately.",
    "Never aggregate a measure without confirming its grain.",
    "Which measure is additive across order lines and which may not be?"
  ],
  [
    "Data Modeling & Warehousing",
    "Intermediate",
    "Concept",
    "What is the difference between a star and a snowflake schema?",
    "A star connects a central fact directly to denormalized dimensions; a snowflake further normalizes dimension attributes into related tables.",
    "Trade off simpler queries against storage, governance and attribute design needs.",
    "Why may a star schema be easier for BI users?"
  ],
  [
    "Data Modeling & Warehousing",
    "Interview",
    "Concept",
    "What does additive, semi-additive and non-additive mean for measures?",
    "Additive measures can sum across all dimensions; semi-additive measures can sum across some but not time; non-additive measures such as ratios should usually be recalculated from their components.",
    "Balances are often semi-additive; percentages often non-additive.",
    "Why should regional conversion rates not simply be summed?"
  ],
  [
    "Data Modeling & Warehousing",
    "Interview",
    "Scenario",
    "A dimension key is duplicated on the supposed one side of a relationship. What happens?",
    "The relationship may not support the intended one-to-many model and can multiply facts or cause ambiguity. Resolve duplicates or define the proper grain before modelling.",
    "Validate dimension-key uniqueness as a pipeline quality rule.",
    "How would you find repeated dimension keys?"
  ],
  [
    "Data Modeling & Warehousing",
    "Intermediate",
    "Concept",
    "What is a bridge table?",
    "A bridge table represents a many-to-many relationship by storing the associations between entities, with careful measure handling to avoid double counting.",
    "Define allocation rules if a fact must be split among several members.",
    "Give an example involving accounts and customers."
  ],
  [
    "Data Modeling & Warehousing",
    "Interview",
    "Concept",
    "What is a conformed dimension?",
    "A conformed dimension has a consistent definition and keys across multiple facts or data marts, enabling comparable reporting across processes.",
    "Align attribute meanings and history rules, not just column names.",
    "Why is a shared date dimension helpful across sales and support facts?"
  ],
  [
    "Data Modeling & Warehousing",
    "Intermediate",
    "Concept",
    "What is a data mart compared with a data warehouse?",
    "A data mart serves a focused subject area or user group; a data warehouse integrates data for broader analytical use, though architecture varies by organization.",
    "Describe the organization's actual architecture rather than assuming every mart is separate.",
    "When might a certified sales mart be useful?"
  ],
  [
    "Data Modeling & Warehousing",
    "Interview",
    "Practical",
    "How would you model order header and order line data?",
    "Use a header-level fact for order-level measures and a line-level fact for product quantities and line amounts, with shared dimensions as needed.",
    "Do not repeat header-level amounts on every line unless measures are handled accordingly.",
    "Which table should contain unit price and quantity?"
  ],
  [
    "Data Modeling & Warehousing",
    "Interview",
    "Scenario",
    "One source dimension changes its code format. How do you keep history and reporting stable?",
    "Map source business keys to controlled warehouse keys, profile the change, update ingestion and mapping rules, and preserve historical relationships according to the business history policy.",
    "Avoid treating a key-format change as a new entity without checking.",
    "What data-quality checks can detect an unexpected key shift?"
  ],
  [
    "Data Modeling & Warehousing",
    "Intermediate",
    "Concept",
    "What is data lineage?",
    "Data lineage records where data originated and how it was transformed into downstream tables, metrics or reports.",
    "Lineage helps audit changes and trace mismatches from report back to source.",
    "What lineage details would you record for a KPI?"
  ],
  [
    "Data Modeling & Warehousing",
    "Interview",
    "Practical",
    "How would you validate a dimensional model before BI release?",
    "Test grain, dimension-key uniqueness, fact foreign-key coverage, measure additivity, date coverage, slowly changing dimension rules and reconciled totals.",
    "Include edge cases such as unknown members and late-arriving facts.",
    "Which fact-to-dimension check should fail the build?"
  ]
];
  rows.push(...v31Rows);

  const sources = {
    "SQL": {label:"PostgreSQL official SQL tutorial", url:"https://www.postgresql.org/docs/current/tutorial.html"},
    "Excel": {label:"Microsoft Excel XLOOKUP documentation", url:"https://support.microsoft.com/en-us/excel/functions/xlookup-function"},
    "Power BI": {label:"Microsoft Learn: Power BI modelling", url:"https://learn.microsoft.com/en-us/power-bi/transform-model/"},
    "Python & Pandas": {label:"Python and pandas official guides", url:"https://pandas.pydata.org/docs/user_guide/"},
    "Data Analysis": {label:"Microsoft Learn: star schema concepts", url:"https://learn.microsoft.com/en-us/power-bi/guidance/star-schema"},
    "Data Engineering": {label:"Python and SQL official guides", url:"https://docs.python.org/3/tutorial/"},
    "Infor Birst": {label:"Infor Birst official documentation", url:"https://docs.infor.com/birst/latest/en-us/birstolh/default.html"},
    "Business Analyst & Requirements": {label:"IIBA business analysis resources", url:"https://www.iiba.org/"},
    "MIS & Reporting": {label:"Microsoft Learn: Power Query", url:"https://learn.microsoft.com/en-us/power-query/"},
    "Data Modeling & Warehousing": {label:"Microsoft Learn: star schema guidance", url:"https://learn.microsoft.com/en-us/power-bi/guidance/star-schema"}
  };
  const roleMap = {
    "SQL": ["Data Analyst", "BI Analyst", "Junior Data Engineer", "MIS/Reporting Analyst"],
    "Excel": ["Data Analyst", "MIS/Reporting Analyst", "BI Analyst"],
    "Power BI": ["BI Analyst", "Data Analyst", "Junior BI Developer"],
    "Python & Pandas": ["Data Analyst", "Junior Data Engineer"],
    "Data Analysis": ["Data Analyst", "BI Analyst", "Business Analyst"],
    "Data Engineering": ["Junior Data Engineer", "Data Analyst"],
    "Infor Birst": ["BI Analyst", "Junior BI Developer"],
    "HR & Telephonic": ["All roles"],
    "Resume & Projects": ["All roles"],
    "English & Confidence": ["All roles"],
    "Business Analyst & Requirements": ["Business Analyst", "Data Analyst", "BI Analyst"],
    "MIS & Reporting": ["MIS/Reporting Analyst", "Data Analyst"],
    "Data Modeling & Warehousing": ["BI Analyst", "Junior Data Engineer", "Data Analyst"]
  };
  const seenQuestions = new Set();
  const validRows = rows.filter((r) => {
    if (!Array.isArray(r) || r.length < 5 || !r[0] || !r[1] || !r[2] || !r[3] || !r[4]) return false;
    const key = String(r[3]).trim().toLowerCase();
    if (seenQuestions.has(key)) return false;
    seenQuestions.add(key);
    return true;
  });
  window.INTERVIEW_QUESTION_BANK_VERSION = "3.1.0";
  window.INTERVIEW_QUESTIONS = validRows.map((r, i) => ({
    id: "iq-" + String(i + 1).padStart(3, "0"), category: r[0], difficulty: r[1], type: r[2],
    question: r[3], answer: r[4], tip: r[5] || "", followUp: r[6] || "", source: sources[r[0]] || null,
    roles: roleMap[r[0]] || ["Data Analyst"]
  }));
  if (window.INTERVIEW_QUESTIONS.length !== rows.length) console.warn("Interview Quest removed malformed or duplicate question records from the question bank.");
})();
